/// <reference path="../jquery-3.2.1.js" />
/// <reference path="../jquery.toast.js" />
/// <reference path="../jquery.unobtrusive-ajax.js" />
/// <reference path="../jquery-confirm.min.js" />
$(document).ready(function () {
    loadEmployees();
})
//loal list employees
function loadEmployees() {
    $.ajax({
        url: "/Employees/ListEmpDepart",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function myfunction(key, item) {
                html += '<tr>';
                html += '<td>' + item.ID + '</td>';
                html += '<td>' + item.EmployeeID + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.DOB + '</td>';
                html += '<td>' + item.Gender + '</td>';
                html += '<td>' + item.StartDate + '</td>';
                html += '<td>' + item.EndDate + '</td>';
                html += '<td>' + item.DepartmentName + '</td>';
                html += '<td><a class="btn btn-info btn-sm" onclick="getEmpByID(' + item.ID + ');"><span class="glyphicon glyphicon-edit"></span> Edit</a></td>';
                html += '<td><a class="btn btn-danger btn-sm" onclick="deleteEmployee(' + item.ID + ');"><span class="glyphicon glyphicon-remove"></span> Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
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
//Load dropdownlist phòng ban
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
//Add employees
function insertEmployees() {
    debugger
    var empObj = {
        ID: $('#emp_code').val(),
        EmployeeID: $('#emp_id').val(),
        Name: $('#emp_name').val(),
        DOB: $('#emp_dob').val(),
        Gender: $('#emp_gender').val(),
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
            loadEmployees();
            $('#modal_employees').modal('hide');
            $.toast({
                heading: 'Thông báo',
                text: 'Thêm mới nhân viên thành công!',
                showHideTransition: 'fade',
                icon: 'success',
                position: 'top-right'
            })
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
//Get employee by ID
function getEmpByID(ID) {
    $(".ctn-title").html(' <span class="glyphicon glyphicon-edit"></span>  Update an employee.');
    $('#emp_id').css('border-color', 'lightgrey');
    $('#emp_name').css('border-color', 'lightgrey');
    $('#emp_dob').css('border-color', 'lightgrey');
    $('#emp_gender').css('border-color', 'lightgrey');
    $('#emp_startdate').css('border-color', 'lightgrey');
    $('#emp_endate').css('border-color', 'lightgrey');
    $('#emp_depart').css('border-color', 'lightgrey');
    loadDepartment();
    debugger
    $.ajax({
        url: '/Employees/GetById/' + ID,
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#emp_code').val(result.ID),
            $('#emp_id').val(result.EmployeeID),
            $('#emp_name').val(result.Name),
            $('#emp_dob').val(result.DOB),
            $('#emp_gender').val(result.Gender),
            $('#emp_startdate').val(result.StartDate),
            $('#emp_endate').val(result.EndDate),
            $('#modal_employees').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
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
    return false;
}
//update employee
function Update() {
    debugger
    var empObj = {
        ID: $('#emp_code').val(),
        EmployeeID: $('#emp_id').val(),
        Name: $('#emp_name').val(),
        DOB: $('#emp_dob').val(),
        Gender: $('#emp_gender').val(),
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
            loadEmployees();
            $('#modal_employees').modal('hide');
            $.toast({
                heading: 'Thông báo',
                text: 'Upate nhân viên thành công!',
                showHideTransition: 'fade',
                icon: 'success',
                position: 'top-right'
            })
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
//Delete employees
function deleteEmployee(ID) {
    $.confirm({
        title: 'Delete Employee.',
        content: 'Are you sure delete this employee has an id: ' + ID + '',
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
                        url: '/Employees/Delete/' + ID,
                        contentType: "application/json;charset=utf-8",
                        dataType: 'json',
                        method: 'POST'
                    }).done(function (response) {
                        loadEmployees();
                        $.toast({
                            heading: 'Thông báo',
                            text: 'Xoa nhân viên thành công!',
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
//Clear textbox
function clearTextbox() {
    $(".ctn-title").html(' <span class="glyphicon glyphicon-edit"></span>  Insert new an employee.');
    $('#emp_code').val(""),
    $('#emp_id').val(""),
    $('#emp_name').val(""),
    $('#emp_dob').val(""),
    $('#emp_gender').val(""),
    $('#emp_startdate').val(""),
    $('#emp_endate').val(""),
    $('#emp_depart').val("")
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#emp_id').css('border-color', 'lightgrey');
    $('#emp_name').css('border-color', 'lightgrey');
    $('#emp_dob').css('border-color', 'lightgrey');
    $('#emp_gender').css('border-color', 'lightgrey');
    $('#emp_startdate').css('border-color', 'lightgrey');
    $('#emp_endate').css('border-color', 'lightgrey');
    $('#emp_depart').css('border-color', 'lightgrey');
    loadDepartment();
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#EmployeeID').val() == "") {
        $('#EmployeeID').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EmployeeID').css('border-color', 'lightgrey');
    }
    if ($('#Name').val() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#DOB').val() == "") {
        $('#DOB').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DOB').css('border-color', 'lightgrey');
    }
    if ($('#Gender').val() == "") {
        $('#Gender').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Gender').css('border-color', 'lightgrey');
    }
    if ($('#StartDate').val() == "") {
        $('#StartDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#StartDate').css('border-color', 'lightgrey');
    }
    if ($('#EndDate').val() == "") {
        $('#EndDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EndDate').css('border-color', 'lightgrey');
    }
    if ($('#DepartmentID').val() == "") {
        $('#DepartmentID').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DepartmentID').css('border-color', 'lightgrey');
    }
    return isValid;
}