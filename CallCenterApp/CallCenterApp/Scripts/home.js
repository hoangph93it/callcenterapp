﻿/// <reference path="jquery-1.10.2.js" />
///// <reference path="jquery-ui-1.12.1.js" />
/// <reference path="bootstrap-datetimepicker.js" />
$(document).ready(function () {
    var wh = $(window).height();
    $('.img-bg').css({ "height": wh - 50 + "px" });

    $('#emp_dob').datetimepicker({
        locale: 'vi',
        format: 'DD/MM/YYYY'
    });
    $('#emp_startdate').datetimepicker({
        locale: 'vi',
        format: 'DD/MM/YYYY'
    });
    $('#emp_endate').datetimepicker({
        locale: 'vi',
        format: 'DD/MM/YYYY'
    });

    var path = window.location.pathname;
    var url = $('ul.nav li a[href="' + path + '"]');
    url.addClass('active');
    //$("#datepicker").datepicker({
    //    dateFormat: "dd/mm/yy",
    //    changeMonth: true,
    //    changeYear: true
    //});
    //$("#StartDate").datepicker({
    //    dateFormat: "dd/mm/yy",
    //    changeMonth: true,
    //    changeYear: true
    //});
    //$("#EndDate").datepicker({
    //    dateFormat: "dd/mm/yy",
    //    changeMonth: true,
    //    changeYear: true
    //});

    //(function (factory) {
    //    if (typeof define === "function" && define.amd) {

    //        // AMD. Register as an anonymous module.
    //        define(["../widgets/datepicker"], factory);
    //    } else {

    //        // Browser globals
    //        factory(jQuery.datepicker);
    //    }
    //}(function (datepicker) {

    //    datepicker.regional.vi = {
    //        closeText: "Đóng",
    //        prevText: "&#x3C;Trước",
    //        nextText: "Tiếp&#x3E;",
    //        currentText: "Hôm nay",
    //        monthNames: ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu",
    //        "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
    //        monthNamesShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    //        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
    //        dayNames: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
    //        dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    //        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    //        weekHeader: "Tu",
    //        //dateFormat: "dd/mm/yy",
    //        firstDay: 0,
    //        isRTL: false,
    //        showMonthAfterYear: false,
    //        yearSuffix: ""
    //    };
    //    datepicker.setDefaults(datepicker.regional.vi);

    //    return datepicker.regional.vi;

    //}));
})
var $loading = $('#loading').hide();
$(document)
  .ajaxStart(function () {
      $loading.show();
      $("body").addClass("app-loading");
  })
  .ajaxStop(function () {
      $loading.hide();
      $("body").removeClass("app-loading");
  });