USE CallCenter;
SELECT * FROM Customers
--Trả ra tổng số cuộc gọi theo từng trạng thái
SELECT COUNT(cac.PhoneID) AS TOTALCALL
FROM CallDetail cac 
WHERE cac.StatusID='BU'
--Viết Store trả ra tổng số cuộc gọi theo từng trạng thái, tham số truyền vào là trạng thái cuộc gọi
CREATE PROCEDURE SP_TOTAL_CALL_BY_STT(@stt NCHAR(10))
AS
BEGIN
	SELECT COUNT(cac.PhoneID) AS TOTALCALL
	FROM CallDetail cac 
	WHERE @stt= cac.StatusID;
END;
EXECUTE dbo.SP_TOTAL_CALL_BY_STT @stt='NO';
--Viết hàm đếm xem có bao nhiêu cuộc gọi thành công
CREATE FUNCTION FUN_COUNT_CALL_AN()
RETURNS INTEGER
AS
BEGIN
	RETURN(
		
		SELECT COUNT(cac.PhoneID)
		FROM CallDetail cac 
		WHERE cac.StatusID='AN'
	)
END;
--Viết hàm đếm xem có bao nhiêu cuộc gọi bận
CREATE FUNCTION FUN_COUNT_CALL_BU()
RETURNS INTEGER
AS
BEGIN
	RETURN(
		SELECT COUNT(cac.PhoneID)
		FROM CallDetail cac 
		WHERE cac.StatusID='BU'
	)
END;
--Viết hàm đếm xem có bao nhiêu cuộc gọi không trả lời
CREATE FUNCTION FUN_COUNT_CALL_NO()
RETURNS INTEGER
AS
BEGIN
	RETURN(
		SELECT COUNT(cac.PhoneID)
		FROM CallDetail cac 
		WHERE cac.StatusID='NO'
	)
END;
----
SELECT dbo.FUN_COUNT_CALL_AN() AS TOTALCALLSUCCESS
SELECT dbo.FUN_COUNT_CALL_BU() AS TOTALCALLBYSY
SELECT dbo.FUN_COUNT_CALL_NO() AS TOTALCALLNOANSWERED
--Viết store thống kê tình trạng các cuộc gọi
CREATE PROCEDURE SP_TOTAL_CALL_STT
AS
BEGIN
	SELECT dbo.FUN_COUNT_CALL_AN() AS TOTALCALLANSWERE
		   ,dbo.FUN_COUNT_CALL_BU() AS TOTALCALLBUSY
		   ,dbo.FUN_COUNT_CALL_NO() AS TOTALCALLNOAN
		   ,SUM(dbo.FUN_COUNT_CALL_BU()+dbo.FUN_COUNT_CALL_NO()) AS TOTALCALLFIELD
		   ,CAST(dbo.FUN_COUNT_CALL_BU() AS FLOAT)/CAST(dbo.FUN_COUNT_CALL_BU()+ dbo.FUN_COUNT_CALL_NO() AS FLOAT) AS RATECALL
END;
EXECUTE dbo.SP_TOTAL_CALL_STT;
--Trả về số điện thoại theo tên chủ số(khác hàng) truyền vào trạng thái của cuộc gọi(BUSY, ANSWERED, NO ANSWERED)
SELECT cac.PhoneID
	,cus.Name
FROM CallDetail cac
INNER JOIN PhoneNumbers p_num ON cac.PhoneID = p_num.PhoneNumber
INNER JOIN Customers cus ON p_num.CustomerID = cus.CustomerID
WHERE cac.StatusID = 'BU'
ORDER BY cus.Name;
----Viết thủ tục trả về số điện thoại theo tên chủ số(khác hàng) truyền vào trạng thái của cuộc gọi(BUSY, ANSWERED, NO ANSWERED). Tham số truyền vào là trạng thái cuộc gọi
CREATE PROCEDURE SP_CALL_STATUS (@stt_call NCHAR(10))
AS
BEGIN
	SELECT cus.Name
		,cac.PhoneID
	FROM CallDetail cac
	INNER JOIN PhoneNumbers p_num ON cac.PhoneID = p_num.PhoneNumber
	INNER JOIN Customers cus ON p_num.CustomerID = cus.CustomerID
	WHERE @stt_call = cac.StatusID
	ORDER BY cus.Name;
END;
EXECUTE dbo.SP_CALL_STATUS @stt_call='AN';
--Trả về số diện thoại theo từng khác hàng
SELECT cus.CustomerID
	,cus.Name
	,p_num.PhoneNumber
FROM Customers cus
INNER JOIN PhoneNumbers p_num ON cus.CustomerID = p_num.CustomerID
WHERE cus.CustomerID = 'KH1'
ORDER BY cus.CustomerID;
--Viết thủ tục trả về mã khách hàng, tên khác hàng, số điện thoại tương ứng khác hàng sắp xếp theo tên khách hàng. Tham số truyền vào là mã khách hàng
CREATE PROCEDURE SP_CUS_NUMBER(@cus_id NCHAR(10))
AS
BEGIN
	SELECT cus.CustomerID
	,cus.Name
	,p_num.PhoneNumber
	FROM Customers cus
	INNER JOIN PhoneNumbers p_num ON cus.CustomerID = p_num.CustomerID
	WHERE @cus_id= cus.CustomerID
	ORDER BY cus.CustomerID;
END;
EXECUTE dbo.SP_CUS_NUMBER @cus_id='KH1';
--Trả về tổng số cuộc gọi của mỗi nhân viên
SELECT DISTINCT cac.EmployeeID, COUNT(cac.PhoneID) AS TOTALCALL
FROM CallDetail cac
GROUP BY cac.EmployeeID;
--Viết Store trả về tổng số tất cả các cuộc gọi của mỗi nhân viên
CREATE PROCEDURE SP_TOTAL_FULL_CALL
AS
BEGIN
	SELECT cac.EmployeeID, emp.Name, COUNT(cac.PhoneID) AS TOTALCALL
	FROM CallDetail cac
	INNER JOIN Employees emp ON cac.EmployeeID= emp.EmployeeID
	GROUP BY cac.EmployeeID,emp.Name;
END;
EXECUTE dbo.SP_TOTAL_FULL_CALL
--Trả về tổng số cuộc gọi của mỗi nhân viên mà có số cuộc gọi thành công
SELECT DISTINCT cac.EmployeeID, COUNT(cac.PhoneID) AS TOTALCALL
FROM CallDetail cac
WHERE cac.StatusID='AN'
GROUP BY cac.EmployeeID;
--Trả về tổng số cuộc gọi của mỗi nhân viên mà có số cuộc gọi bận
SELECT DISTINCT cac.EmployeeID, COUNT(cac.PhoneID) AS TOTALCALL
FROM CallDetail cac
WHERE cac.StatusID='BU'
GROUP BY cac.EmployeeID;
--Trả về tổng số cuộc gọi của mỗi nhân viên mà có số cuộc gọi không trả lời
SELECT DISTINCT cac.EmployeeID, emp.Name, COUNT(cac.PhoneID) AS TOTALCALL
FROM CallDetail cac
INNER JOIN Employees emp ON cac.EmployeeID=emp.EmployeeID
WHERE cac.StatusID='AN'
GROUP BY cac.EmployeeID, emp.Name;
--Viết Store trả về tổng số cuộc gọi của mỗi nhân viên theo từng trạng thái, tham số truyền nào là trạng thái cuộc gọi
CREATE PROCEDURE SP_TOTAL_CALL_EMP_BY_STT(@stt NCHAR(10))
AS
BEGIN
	SELECT cac.EmployeeID, emp.Name,  COUNT(cac.PhoneID) AS TOTALCALL
	FROM CallDetail cac
	INNER JOIN Employees emp ON cac.EmployeeID=emp.EmployeeID
	WHERE @stt = cac.StatusID
	GROUP BY cac.EmployeeID, emp.Name;
END;
EXECUTE dbo.SP_TOTAL_CALL_EMP_BY_STT @stt='AN';
--Tạo VIEW trả về các nhân viên có tổng số cuộc gọi thành nghe máy
CREATE VIEW VI_COUNT_CALL_EMP_AN
AS
SELECT cac.EmployeeID, COUNT(cac.PhoneID) AS TOTALCALL
FROM CallDetail cac
WHERE cac.StatusID='AN'
GROUP BY cac.EmployeeID;
--Tạo View trả về các nhân viên có tổng số cuộc gọi máy bận
CREATE VIEW VI_COUNT_CALL_EMP_BU
AS
SELECT cac.EmployeeID, COUNT(cac.PhoneID) AS TOTALCALL
FROM CallDetail cac
WHERE cac.StatusID='BU'
GROUP BY cac.EmployeeID;
--Tạo VIEW trả về các nhân viên có tổng số cuộc gọi không nghe máy
CREATE VIEW VI_COUNT_CALL_EMP_NO
AS
SELECT cac.EmployeeID, COUNT(cac.PhoneID) AS TOTALCALL
FROM CallDetail cac
WHERE cac.StatusID='NO'
GROUP BY cac.EmployeeID;
--Tạo view trả về mã nhân viên, tổng số cuộc gọi của nhân viên, tổng số cuộc gọi trả lời, tổng số cuộc gọi máy bận, tổng số cuộc gọi không nghe máy
CREATE VIEW VI_REPORT_CALL
AS
	SELECT cac.EmployeeID
	,COUNT(cac.PhoneID) AS 'Total call'
	,vi_an.TOTALCALL AS 'Total call answered'
	,vi_bu.TOTALCALL AS 'Total call busy'
	,vi_no.TOTALCALL AS 'Total call no answed'
FROM CallDetail cac
FULL JOIN dbo.VI_COUNT_CALL_EMP_AN vi_an ON cac.EmployeeID = vi_an.EmployeeID
FULL JOIN dbo.VI_COUNT_CALL_EMP_BU vi_bu ON cac.EmployeeID = vi_bu.EmployeeID
	OR vi_bu.EmployeeID = vi_an.EmployeeID
FULL JOIN dbo.VI_COUNT_CALL_EMP_NO vi_no ON cac.EmployeeID = vi_no.EmployeeID
	OR vi_no.EmployeeID = vi_bu.EmployeeID
	OR vi_no.EmployeeID = vi_an.EmployeeID
GROUP BY cac.EmployeeID
	,vi_an.TOTALCALL
	,vi_bu.TOTALCALL
	,vi_no.TOTALCALL;
--Viết Store thực hiện trên view VI_REPORT_CALL
CREATE PROCEDURE SP_VIEW_REPORT_CALL
AS
BEGIN
	SELECT * FROM dbo.VI_REPORT_CALL
END;
EXECUTE dbo.SP_VIEW_REPORT_CALL;
--Viết Store tính tỷ lệ số cuộc gọi thành công
CREATE PROCEDURE SP_VIEW_REPORT_CALL_RATE
AS
BEGIN
	SELECT re_call.EmployeeID
	,re_call.[Total call]
	,re_call.[Total call answered]
	,re_call.[Total call busy]
	,re_call.[Total call no answed]
	,SUM(re_call.[Total call busy] + re_call.[Total call no answed]) AS 'Total call Field'
	,CAST(re_call.[Total call answered] AS FLOAT) / CAST(re_call.[Total call busy] + re_call.[Total call no answed] AS FLOAT) AS 'Rate call'
FROM dbo.VI_REPORT_CALL re_call
GROUP BY re_call.EmployeeID
	,re_call.[Total call]
	,re_call.[Total call a nswered]
	,re_call.[Total call busy]
	,re_call.[Total call no answed];
END;
EXECUTE dbo.SP_VIEW_REPORT_CALL_RATE;
--Tạo view trả về tổng số cuộc gọi nghe máy(thành công) theo từng khách hàng
CREATE VIEW VI_TOTAL_CUS_CALL_AN
AS
SELECT cus.CustomerID
	   , cus.Name
	   ,COUNT(cac.PhoneID) AS Totalcall
	FROM CallDetail cac
	INNER JOIN PhoneNumbers p_num ON cac.PhoneID = p_num.PhoneNumber
	INNER JOIN Customers cus ON p_num.CustomerID = cus.CustomerID
	WHERE cac.StatusID ='AN'
	GROUP BY cus.CustomerID, cus.Name;
----Tạo view trả về tổng số cuộc gọi máy bận theo từng khách hàng
CREATE VIEW VI_TOTAL_CUS_CALL_BU
AS
SELECT cus.CustomerID
	   ,cus.Name
	   ,COUNT(cac.PhoneID) AS Totalcall
	FROM CallDetail cac
	INNER JOIN PhoneNumbers p_num ON cac.PhoneID = p_num.PhoneNumber
	INNER JOIN Customers cus ON p_num.CustomerID = cus.CustomerID
	WHERE cac.StatusID ='BU'
	GROUP BY cus.CustomerID, cus.Name;
----Tạo view trả về tổng số cuộc gọi không nghe máy theo từng khách hàng
CREATE VIEW VI_TOTAL_CUS_CALL_NO
AS 
SELECT cus.CustomerID
	   ,cus.Name
	   ,COUNT(cac.PhoneID) AS Totalcall
	FROM CallDetail cac
	INNER JOIN PhoneNumbers p_num ON cac.PhoneID = p_num.PhoneNumber
	INNER JOIN Customers cus ON p_num.CustomerID = cus.CustomerID
	WHERE cac.StatusID ='NO'
	GROUP BY cus.CustomerID, cus.Name;
---Viết thủ tục thống kê tổng số trạng thái các cuộc gọi theo từng khách hàng.
CREATE PROCEDURE SP_TOTAL_CALL_CUS_STT
AS
BEGIN
SELECT vi_cus_an.CustomerID
		,vi_cus_an.Name
		,vi_cus_an.Totalcall AS 'Total call answered'
		,vi_cus_bu.Totalcall AS 'Total call busy'
		,vi_cus_no.Totalcall AS 'Total no answered'
		,SUM(vi_cus_bu.Totalcall + vi_cus_no.Totalcall) AS 'Total call false'
	FROM dbo.VI_TOTAL_CUS_CALL_AN vi_cus_an
	FULL JOIN dbo.VI_TOTAL_CUS_CALL_BU vi_cus_bu ON vi_cus_an.CustomerID = vi_cus_bu.CustomerID
	FULL JOIN dbo.VI_TOTAL_CUS_CALL_NO vi_cus_no ON vi_cus_no.CustomerID = vi_cus_an.CustomerID
		OR vi_cus_no.CustomerID = vi_cus_bu.CustomerID
	GROUP BY vi_cus_an.CustomerID
		,vi_cus_an.Name
		,vi_cus_an.Totalcall
		,vi_cus_bu.Totalcall
		,vi_cus_no.Totalcall;
END;
EXECUTE dbo.SP_TOTAL_CALL_CUS_STT;
--VIẾT STORE PROCEDURE THỰC THI TRÊN OBJECT EMPLOYEE
--Viết store lấy ra danh sách tất cả các nhân viên
CREATE PROCEDURE SP_LIST_ALL_EMPLOYEE
AS
BEGIN
	SELECT emp.ID
		,emp.EmployeeID
		,emp.Name
		,emp.DOB
		,emp.Gender
		,emp.HomeAddress
		,emp.Phone
		,emp.Email
		,emp.StartDate
		,emp.EndDate
		,dep.Name AS DepartmentName
	FROM Employees emp
	INNER JOIN Department dep ON emp.Id_Depart = dep.ID
	ORDER BY emp.ID ASC;
END;
--Viết store tìm kiếm nhân viên với tham số truyền vào mã nhân viên, tên nhân viên và phòng ban.
CREATE PROCEDURE SP_SEARCH_EMPLOYEES (
	@EmployeeID NVARCHAR(50) = NULL
	,@Name NVARCHAR(50) = NULL
	,@Id_Depart INT = NULL
	)
AS
BEGIN
	SELECT emp.ID
		,emp.EmployeeID
		,emp.Name
		,emp.DOB
		,emp.Gender
		,emp.HomeAddress
		,emp.Phone
		,emp.Email
		,emp.StartDate
		,emp.EndDate
		,dep.Name AS DepartmentName
	FROM Employees emp
	INNER JOIN Department dep ON emp.Id_Depart = dep.ID
	WHERE Id_Depart = @Id_Depart
		AND (
			(emp.EmployeeID LIKE '%' + IsNull(@EmployeeID, emp.EmployeeID) + '%')
			AND Id_Depart = @Id_Depart
			)
		AND (
			(emp.Name LIKE '%' + IsNull(@Name, emp.Name) + '%')
			AND Id_Depart = @Id_Depart
			)
		AND (
			(emp.EmployeeID LIKE '%' + IsNull(@EmployeeID, emp.EmployeeID) + '%')
			AND (emp.Name LIKE '%' + IsNull(@Name, emp.Name) + '%')
			AND Id_Depart = @Id_Depart
			)
	ORDER BY emp.ID ASC;
END;
--Viết Store drodown list phòng ban
CREATE PROCEDURE SP_DROPDOWN_LIST_DEPARMENT
AS
BEGIN
	SELECT depart.ID
		,depart.Name
		,depart.StartDate
		,depart.Manager
	FROM Department depart
	ORDER BY depart.ID ASC;
END;
--Viết Store thêm mới, chỉnh sửa nhân viên
CREATE PROCEDURE SP_INSERT_UPDATE_EMPLOYEE (
	@ID INT = NULL
	,@EmployeeID NVARCHAR(50) = NULL
	,@Name NVARCHAR(50) = NULL
	,@DOB NVARCHAR(50) = NULL
	,@Gender NVARCHAR(50) = NULL
	,@HomeAddress NVARCHAR(150) = NULL
	,@Phone INT = NULL
	,@Email NVARCHAR(50) = NULL
	,@StartDate NVARCHAR(50) = NULL
	,@EndDate NVARCHAR(50) = NULL
	,@Id_Depart NVARCHAR(50) = NULL
	,@Action VARCHAR(10) = NULL
	,@Error INT = NULL OUTPUT
	)
AS
BEGIN
	--Check trùng mã
	IF EXISTS (
			SELECT *
			FROM Employees
			WHERE EmployeeID = LTRIM(RTRIM(@EmployeeID))
			)
		SET @Error = - 1;
	ELSE
	BEGIN
		--Thêm mới nhân viên
		IF @Action = 'INSERT'
		BEGIN
			INSERT INTO Employees (
				EmployeeID
				,Name
				,DOB
				,Gender
				,HomeAddress
				,Phone
				,Email
				,StartDate
				,EndDate
				,Id_Depart
				)
			VALUES (
				LTRIM(RTRIM(@EmployeeID))
				,LTRIM(RTRIM(@Name))
				,LTRIM(RTRIM(@DOB))
				,LTRIM(RTRIM(@Gender))
				,LTRIM(RTRIM(@HomeAddress))
				,LTRIM(RTRIM(@Phone))
				,LTRIM(RTRIM(@Email))
				,LTRIM(RTRIM(@StartDate))
				,LTRIM(RTRIM(@EndDate))
				,LTRIM(RTRIM(@Id_Depart))
				);
		END;
	END;
	--Chỉnh sửa nhân viên
	IF @Action = 'UPDATE'
	BEGIN
		UPDATE Employees
		SET EmployeeID = LTRIM(RTRIM(@EmployeeID))
			,Name = LTRIM(RTRIM(@Name))
			,DOB = LTRIM(RTRIM(@DOB))
			,Gender = LTRIM(RTRIM(@Gender))
			,HomeAddress = LTRIM(RTRIM(@HomeAddress))
			,Phone = LTRIM(RTRIM(@Phone))
			,Email = LTRIM(RTRIM(@Email))
			,StartDate = LTRIM(RTRIM(@StartDate))
			,EndDate = LTRIM(RTRIM(@EndDate))
			,Id_Depart = LTRIM(RTRIM(@Id_Depart))
		WHERE ID = @ID;
	END;
END;
--Viết Store xóa một nhân viên
CREATE PROCEDURE SP_DELETE_EMPLOYEE (@ID INTEGER=NULL)
AS
BEGIN
	DELETE
	FROM Employees
	WHERE ID = @ID;
END;
---Set 2 khóa chính cho bảng
ALTER TABLE Employees
ADD CONSTRAINT PK_ID_EMPID PRIMARY KEY(ID, EmployeeID)
---Update 2 khóa chính của bảng
ALTER TABLE CallDetail
   ADD CONSTRAINT FK_ID_EMPID_CALL
   FOREIGN KEY(Id_Emp, EmployeeID)
   REFERENCES Employees(ID, EmployeeID)
--Viết Store Login
CREATE PROCEDURE SP_LOGIN (
	 @UserName NVARCHAR(50) = NULL
	,@PASSWORD NVARCHAR(50) = NULL
	,@Error INT = NULL OUTPUT
	)
AS
BEGIN
	--Check sự tồn tại của user
	IF NOT EXISTS (
			SELECT * 
			FROM Users
			WHERE UserName = LTRIM(RTRIM(@UserName)) AND PassWord = LTRIM(RTRIM(@PASSWORD))
			)
		SET @Error = - 1;
	ELSE
	BEGIN
		--Lấy ra thông tin user
		SELECT * FROM Users
		WHERE UserName = LTRIM(RTRIM(@UserName)) AND PassWord = LTRIM(RTRIM(@PASSWORD))
		
	END;
	
END;