import React from 'react'
import { DatePicker } from 'antd';
import {connect} from 'react-redux'
import {updateParams} from './reducer/meetingManageReducer'


@connect(
  state=>state.meetingManage,
  {updateParams}
)
class DateRange extends React.Component {
  state = {
    beginTime: null,
    endTime: null,
    endOpen: false,
  };

  disabledStartDate = (beginTime) => {
    const endTime = this.state.endTime;
    if (!beginTime || !endTime) {
      return false;
    }
    return beginTime.valueOf() > endTime.valueOf();
  }

  disabledEndDate = (endTime) => {
    const beginTime = this.state.beginTime;
    if (!endTime || !beginTime) {
      return false;
    }
    return endTime.valueOf() <= beginTime.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    let val;
    if(value){
      val = new Date(value).getTime()
    }else{
      val = ""
    }
    this.onChange('beginTime', value);
    let params = this.props.params;
    params = {...params,beginTime: val}
    this.props.updateParams(params);
    //console.log(params)
  }

  onEndChange = (value) => {
    let val;
    if(value){
      val = new Date(value).getTime()
    }else{
      val = ""
    }
    this.onChange('endTime', value);
    let params = this.props.params;
    params = {...params,endTime: val}
    this.props.updateParams(params);
    //console.log(params)
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  render() {
    const { beginTime, endTime, endOpen } = this.state;
    return (
      <span>
        <DatePicker
          className="mr20"
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={beginTime}
          placeholder="开始时间"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker
          className="mr20"
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={endTime}
          placeholder="结束时间"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </span>
    );
  }
}
export default DateRange