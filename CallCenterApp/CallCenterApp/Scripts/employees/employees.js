/// <reference path="../jquery-3.2.1.js" />
/// <reference path="../jquery.toast.js" />
/// <reference path="../jquery.unobtrusive-ajax.js" />
/// <reference path="../jquery-confirm.min.js" />
/// <reference path="../jquery.form-validator.min.js" />
/// <reference path="../jquery.twbsPagination.min.js" />
/// <reference path="../bootstrap-table-contextmenu.js" />
/// <reference path="../tableExport.js" />
$(document).ready(function () {
    loadAllEmployees();
    $.validate({
        form: '#form_employees'
    });
})
//Function load all employees
function loadAllEmployees() {
    debugger
    $.ajax({
        url: "/Employees/ListEmpDepart",
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (result) {
            debugger
            $('#tbl_emp').bootstrapTable('load', result);
        },
        error: function (errormessage) {
            $.toast({
                heading: 'Thông báo',
                text: 'Có lỗi xảy ra trong quá trình xử lý!',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            })
        }
    })
}
//Implement context menu
$(function () {
    $('#tbl_emp').bootstrapTable({
        contextMenu: '#table-employee-context-menu',
        onContextMenuItem: function (row, $el) {
            if ($el.data("item") == "edit") {
                $(".ctn-title").html(' <span class="glyphicon glyphicon-edit"></span>  Update an employee.');
                loadDepartment();
                $('#emp_code').val(row.ID),
                $('#emp_id').val(row.EmployeeID),
                $('#emp_name').val(row.Name),
                $('#emp_dob').val(row.DOB),
                $("input[name='gender']:checked").val(row.Gender),
                $('#emp_address').val(row.HomeAddress),
                $('#emp_phone').val(row.Phone),
                $('#emp_mail').val(row.Email),
                $('#emp_startdate').val(row.StartDate),
                $('#emp_endate').val(row.EndDate),
                $('#modal_employees').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
            } else if ($el.data("item") == "delete") {
                $.confirm({
                    title: 'Delete Employee.',
                    content: 'Are you sure delete employee: ' + row.Name + ' - ID: ' + row.ID + '',
                    closeIcon: true,
                    type: 'red',
                    icon: 'glyphicon glyphicon-question-sign',
                    autoClose: 'cancel|10000',
                    buttons: {
                        warning: {
                            text: 'Delete',
                            btnClass: 'btn-warning',
                            action: function () {
                                $.ajax({
                                    url: '/Employees/Delete/' + row.ID,
                                    contentType: "application/json;charset=utf-8",
                                    dataType: 'json',
                                    method: 'POST'
                                }).done(function (response) {
                                    loadAllEmployees();
                                    $.toast({
                                        heading: 'Thông báo',
                                        text: 'Xóa nhân viên thành công!',
                                        showHideTransition: 'fade',
                                        icon: 'success',
                                        position: 'top-right'
                                    })
                                }).fail(function () {
                                    $.toast({
                                        heading: 'Thông báo',
                                        text: 'Có lỗi xảy ra trong quá trình xử lý!',
                                        showHideTransition: 'fade',
                                        icon: 'error',
                                        position: 'top-right'
                                    })
                                });
                            }
                        },
                        cancel: function () {

                        }
                    }
                });
            }
        }
    });
});
//Create function edit and delete
function operateFormatter(value, row, index) {
    return [
        '<a class="edit" href="javascript:void(0)" title="Update">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>',
        '<a class="remove" href="javascript:void(0)" title="Delete">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}
window.operateEvents = {
    //Implement function edit.
    'click .edit': function (e, value, row, index) {
        if (row != "") {
            $(".ctn-title").html(' <span class="glyphicon glyphicon-edit"></span>  Update an employee.');
            loadDepartment();
            $('#emp_code').val(row.ID),
            $('#emp_id').val(row.EmployeeID),
            $('#emp_name').val(row.Name),
            $('#emp_dob').val(row.DOB),
            $("input[name='gender']:checked").val(row.Gender),
            $('#emp_address').val(row.HomeAddress),
            $('#emp_phone').val(row.Phone),
            $('#emp_mail').val(row.Email),
            $('#emp_startdate').val(row.StartDate),
            $('#emp_endate').val(row.EndDate),
            $('#modal_employees').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        } else {
            $.toast({
                heading: 'Thông báo',
                text: 'Có lỗi xảy ra trong quá trình xử lý!',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            })
        }
    },
    //Implement function delete.
    'click .remove': function (e, value, row, index) {
        $.confirm({
            title: 'Delete Employee.',
            content: 'Are you sure delete employee: ' + row.Name + ' - ID: ' + row.ID + '',
            closeIcon: true,
            type: 'red',
            icon: 'glyphicon glyphicon-question-sign',
            autoClose: 'cancel|10000',
            buttons: {
                warning: {
                    text: 'Delete',
                    btnClass: 'btn-warning',
                    action: function () {
                        $.ajax({
                            url: '/Employees/Delete/' + row.ID,
                            contentType: "application/json;charset=utf-8",
                            dataType: 'json',
                            method: 'POST'
                        }).done(function (response) {
                            loadAllEmployees();
                            $.toast({
                                heading: 'Thông báo',
                                text: 'Xóa nhân viên thành công!',
                                showHideTransition: 'fade',
                                icon: 'success',
                                position: 'top-right'
                            })
                        }).fail(function () {
                            $.toast({
                                heading: 'Thông báo',
                                text: 'Có lỗi xảy ra trong quá trình xử lý!',
                                showHideTransition: 'fade',
                                icon: 'error',
                                position: 'top-right'
                            })
                        });
                    }
                },
                cancel: function () {

                }
            }
        });
    }
};
//Set hieght for table
$(function () {
    $('#tbl_emp').bootstrapTable('resetView', { height: getHeight() });
});
//Caculate height for table
function getHeight() {
    return $(window).height() - 250;
}
//Insert employees
debugger
function insertEmployee() {
    var empObj = {
        ID: $('#emp_code').val(),
        EmployeeID: $('#emp_id').val(),
        Name: $('#emp_name').val(),
        DOB: $('#emp_dob').val(),
        Gender: $("input[name='gender']:checked").val(),
        HomeAddress: $('#emp_address').val(),
        Phone: $('#emp_phone').val(),
        Email: $('#emp_mail').val(),
        StartDate: $('#emp_startdate').val(),
        EndDate: $('#emp_endate').val(),
        Id_Depart: $("#emp_depart option:selected").val()
    };
    debugger
    $.ajax({
        url: '/Employees/Add',
        data: JSON.stringify(empObj),
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == 1) {
                loadAllEmployees();
                $('#modal_employees').modal('hide');
                $.toast({
                    heading: 'Thông báo',
                    text: 'Thêm mới nhân viên <b>' + $.trim($('#emp_id').val()) + '</b> thành công!',
                    showHideTransition: 'fade',
                    icon: 'success',
                    position: 'top-right'
                });
                $('#form_employees form').get(0).reset();
            } else {
                $.toast({
                    heading: 'Thông báo',
                    text: 'Mã nhân viên <b>' + $.trim($('#emp_id').val()) + '</b> đã tồn tại!',
                    showHideTransition: 'fade',
                    icon: 'error',
                    position: 'top-right'
                });
            }
        },
        error: function (errormessage) {
            $.toast({
                heading: 'Thông báo',
                text: 'Có lỗi xảy ra trong quá trình xử lý!',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            });
        }
    });
}
//Load dropdownlist department
function loadDepartment() {
    $.ajax({
        url: "/Department/ListDepartment",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function myfunction(key, item) {
                html += '<option value=' + item.ID + '>' + item.Name + '</option>';
            });
            $('#emp_depart').html(html);
            $('#emp_search_depart').html(html);
        },
        error: function (errormessage) {
            $.toast({
                heading: 'Thông báo',
                text: 'Lỗi không thể load được danh sách phòng ban!',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            })
        }
    })
}
//Update employee
function Update() {
    debugger
    var empObj = {
        ID: $('#emp_code').val(),
        EmployeeID: $('#emp_id').val(),
        Name: $('#emp_name').val(),
        DOB: $('#emp_dob').val(),
        Gender: $("input[name='gender']:checked").val(),
        HomeAddress: $('#emp_address').val(),
        Phone: $('#emp_phone').val(),
        Email: $('#emp_mail').val(),
        StartDate: $('#emp_startdate').val(),
        EndDate: $('#emp_endate').val(),
        Id_Depart: $('#emp_depart option:selected').val()
    };
    $.ajax({
        url: '/Employees/Update',
        data: JSON.stringify(empObj),
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadAllEmployees();
            $('#modal_employees').modal('hide');
            $.toast({
                heading: 'Thông báo',
                text: 'Upate nhân viên <b>' + $.trim($('#emp_id').val()) + '</b> thành công!',
                showHideTransition: 'fade',
                icon: 'success',
                position: 'top-right'
            });
        },
        error: function (errormessage) {
            $.toast({
                heading: 'Thông báo',
                text: 'Có lỗi xảy ra trong quá trình xử lý!',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            })
        }
    });
}
//Clear textbox popup
function clearTextbox() {
    $(".ctn-title").html(' <span class="glyphicon glyphicon-edit"></span>  Insert new an employee.');
    $('#emp_code').val(""),
    $('#emp_id').val(""),
    $('#emp_name').val(""),
    $('#emp_dob').val(""),
    $('#emp_gender').val(""),
    $('#emp_address').val(""),
    $('#emp_phone').val(""),
    $('#emp_mail').val(""),
    $('#emp_startdate').val(""),
    $('#emp_endate').val(""),
    $('#emp_depart').val("")
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    loadDepartment();
}