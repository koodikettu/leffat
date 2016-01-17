MovieApp.service('TimeService', function () {

    this.formatDate = function (date) {
        var d = new Date(date);
        return d.toLocaleDateString();
    };
    this.formatTime = function (date) {
        var d = new Date(date);
        return d.toLocaleTimeString();
    };

    this.strToDate = function (date) {
        return new Date(date);
    };

    this.humanReadableTimeDifference = function (milliseconds) {
        var date = new Date(milliseconds);
        var str = '';
        var a = date.getUTCDate() - 1;
        if (a > 1)
            str += a + ' vuorokautta ';
        if (a == 1)
            str += a + ' vuorokausi ';
        a = date.getUTCHours();
        if (a > 1)
            str += a + ' tuntia ';
        if (a == 1)
            str += a + ' tunti ';
        a = date.getUTCMinutes();
        if (a > 1)
            str += a + ' minuuttia ';
        if (a == 1)
            str += a + ' minuuttia ';
        a = date.getUTCSeconds();
        if (a != 1)
            str += a + ' sekuntia.';
        if (a == 1)
            str += a + ' sekunti.';
        return str;

    }
});


