import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { cyan600 } from 'material-ui/styles/colors';
import moment from 'moment';

class DayPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullDateDisplay: this.today(),
            currentMonth: moment().month()
        }
    }
    handleChange = (event, date) => {
        const momentDate = moment(date);
        let choosenDay = momentDate.format('DD MMMM YYYY');
        this.setState({
            fullDateDisplay: choosenDay
        })

        let previous = this.state.currentMonth;
        let current = moment(date).month();

        if (previous !== current) {
            console.dir("New month!!");
            this.setState({
                currentMonth: moment(date).month()
            });
        }

        this.props.onSelect(momentDate);
    }

    today = () => {
        let today = moment().format('DD MMMM YYYY');
        return "Choose a date";
        // return today;
    }
    render() {

        let datePicker;
        const calendarIcon = <IconButton type="submit" onTouchTap={() => datePicker.focus()} ><FontIcon className="material-icons" color={cyan600}>date_range</FontIcon></IconButton>;
        return (
            <div>
                {calendarIcon}
                <DatePicker
                    autoOk={true}
                    defaultDate={this.props.date}
                    hintText={this.state.fullDateDisplay}
                    onChange={this.handleChange}
                    ref={c => datePicker = c}
                />
            </div>
        )
    }
}

export default DayPicker;