/* Your Code Here */


const createEmployeeRecord = (arr) => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (arrArrays) => {
  return arrArrays.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = function (dateStamp){
  const [date, hour] = dateStamp.split(' ')
  // const arrFromDate = dateStamp.split(" ")
  // const date = arrFromDate[0]
  // const hour = arrFromDate[1]
  const inEvent = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  }
  this.timeInEvents.push(inEvent)

  return this
}

const createTimeOutEvent = function (dateStamp){
  const [date, hour] = dateStamp.split(' ')
  // const arrFromDate = dateStamp.split(" ")
  // const date = arrFromDate[0]
  // const hour = arrFromDate[1]
  const outEvent = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  }
  this.timeOutEvents.push(outEvent)

  return this
}

const hoursWorkedOnDate = function (targetDate){
  const inEvent = this.timeInEvents.find(inEvent => inEvent.date === targetDate)
  const outEvent = this.timeOutEvents.find(outEvent => outEvent.date === targetDate)
  return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function (targetDate){
  return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate.call(this, d)
    }, 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function (srcArr, firstName){
  return srcArr.find(employeeRecords => employeeRecords.firstName === firstName)
}

const calculatePayroll = function (employeeRecords){
  return employeeRecords.reduce((total, rec) => {
    return total + allWagesFor.call(rec)
  }, 0)
}

