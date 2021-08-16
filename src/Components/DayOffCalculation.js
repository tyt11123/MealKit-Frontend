export default class {
    constructor (dayOff = []) {
        let timeOption = [];
        let firstDay = new Date();
        if (firstDay.getHours() >= 17) {firstDay.setDate(firstDay.getDate()+1);};
        firstDay.setHours(12,0,0);
        for (let i = 0; i < 7; i++) {
          let workDay = true;
          for (let j = 0; j < dayOff.length; j++) {
            if (this.sameDate(firstDay, new Date(dayOff[j]))) {
              workDay = false;
            };
          };
          if (workDay) {
            let date = firstDay.toISOString().slice(0,10);
            let value = `${date}T07:00:00.000Z~${date}T11:00:00.000Z`; // HK Time 15:00 - 19:00
            timeOption.push({text: `${firstDay.toDateString()} 15:00 - 19:00`, value });
          };
          firstDay.setDate(firstDay.getDate()+1);
        };

        this.timeOption = timeOption;
    };

    sameDate(day1, day2) {
        return day1.getFullYear() === day2.getFullYear() ?
        day1.getMonth() === day2.getMonth() ?
        day1.getDate() === day2.getDate() ?
        true : false : false : false;
    };
};