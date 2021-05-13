/**************************************************載入/更換頁面時執行**************************************************/
$(function () {
    if (document.cookie != "") {
        if (localStorage.getItem("identity") == "admin") {
            $("#lio").html(`<li class="nav-item panelLogOff" id="memberCurrent" style="color:white">
                                    ${document.cookie.split("&")[1].split("=")[1]}，歡迎回來
                                    <div class="btn-group">
                                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color: #2d3d5a">               
                                            <img src="../../imgs/V/iconfinder_user_46842.png" width="32" />                                             
                                        </a>
                                        <div class="dropdown-menu" id="options">
                                            <a class="dropdown-item" id="navProfilePage" no>個人頁面</a>
                                            <a class="dropdown-item" href="/Backend/Index">後臺系統</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#" id="memberLogOut">登出</a>
                                        </div>
                                    </div>
                                </li>
            `);
        }

        if (localStorage.getItem("identity") == "member") {
            $("#lio").html(`<li class="nav-item panelLogOff" id="memberCurrent" style="color:white">
                                    ${document.cookie.split("&")[1].split("=")[1]}，歡迎回來
                                    <div class="btn-group">
                                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color: #2d3d5a">
                                            <img src="../../imgs/V/user_icon_64px.png" width="32" style="border-color:white" />
                                        </a>
                                        <div class="dropdown-menu" id="options">
                                            <a class="dropdown-item" id="navProfilePage" no>個人頁面</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#" id="memberLogOut">登出</a>
                                        </div>
                                    </div>
                                </li>
            `);
        }
    } else {
        $("#lio").html(`<li class="nav-item">
                                    <a class="nav-link" href="#modalLOReg" data-toggle="modal" data-target="#modalLOReg">登入 / 註冊</a>
                                </li>
        `);
    }
});

/**************************************************點擊註冊分頁標籤時執行**************************************************/
/**************************************************      註冊表單 - 步驟一       **************************************************/
//顯示頁面
$("#navtabReg").click(function () {
    $("#navReg").html(`
                              <form id="frmReg" name="frmReg">
                                    <fieldset style="border:2px solid gray; border-radius: 20px">
                                        <legend style="margin-left:40px; width:40%">步驟一:基本資訊</legend>
                                        <span id="repeatErrMsg" style="margin-top:30px; margin-left:15px"></span>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="regName">姓名：</label>
                                            <input type="text" id="regName" name="fMemberName" placeholder="請輸入姓名" required autofocus />
                                            <span id="regNameErrMsg" style="margin-left: 8px"></span>
                                        </div>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="regNickName">暱稱：</label>
                                            <input type="text" id="regNickName" name="fNickname" placeholder="請輸入暱稱" required />
                                            <span id="regNickNameErrMsg" style="margin-left:8px"></span>
                                        </div>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="regBir">生日：</label>
                                            <input type="date" id="regBir" name="fBirthday" placeholder="請輸入生日" required />
                                            <span id="regBirErrMsg" style="margin-left:30px"></span>
                                        </div>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="regAcc">帳號：</label>
                                            <input type="email" id="regAcc" name="fAccount" placeholder="請輸入帳號(Email)" required />
                                            <span id="regAccErrMsg" style="margin-left:8px"></span><br />
                                            <small style="margin-left:54px">請輸入有效電子郵件地址，將作為驗證用</small>
                                        </div>
                                        <div style="margin-top:14px; margin-left:15px">
                                            <label for="regPwd">密碼：</label>
                                            <input type="password" id="regPwd" name="fPassword" placeholder="請輸入密碼" required />
                                            <span id="regPwdErrMsg" style="margin-left:8px"></span><br />
                                            <small style="margin-left:54px">至少8個字元，須包含大寫，小寫英文字母，數字及特殊符號</small>
                                        </div>
                                        <hr />
                                        <div style="margin-top:14px; margin-bottom:14px">
                                            <button type="button" id="regDemo1" style="margin-left:15px" class="btn btn-light">Demo 1</button>
                                            <button type="button" id="regDemo2" class="btn btn-light">Demo 2</button>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal" style="margin-left:20px; width:20%">退出</button>
                                            <button type="button" class="btn btn-primary" id="regSub" style="width:20%">送出</button>
                                        </div>
                                    </fieldset>
                                </form>
    `);
});

//清除錯誤訊息
function clearRegErrMsg() {
    $("#regNameErrMsg").html("");
    $("#regNickNameErrMsg").html("");
    $("#regBirErrMsg").html("");
    $("#regAccErrMsg").html("");
    $("#regPwdErrMsg").html("");
}

//驗證功能 及 產生步驟二頁面
function regChecked() {
    var frmReg = document.querySelector("#frmReg");
    var formdata = new FormData(frmReg); 
    clearRegErrMsg();

    //判斷欄位輸入資訊是否齊全，格式是否正確
    let regBlankErrText, regFormatErrText, regRepeatErrText;
    let paRegResult = false;

    regBlankErrText = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="25"% />欄位不可空白';
    regFormatErrText = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="25"% />密碼格式不符';
    regNicknameErrText = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="25"% />暱稱已被註冊';
    regAccountErrText = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="25"% />帳號已被註冊';
    regRepeatErrText = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="25"% />暱稱及帳號已被註冊';

    if ($("#regName").val() == "") {
        $("#regNameErrMsg").html(regBlankErrText);
    }

    if ($("#regNickName").val() == "") {
        $("#regNickNameErrMsg").html(regBlankErrText);
    }

    if ($("#regBir").val() == "") {
        $("#regBirErrMsg").html(regBlankErrText);
    }

    if ($("#regAcc").val() == "") {
        $("#regAccErrMsg").html(regBlankErrText);
    }

    if ($("#regPwd").val() != "") {
        let re = new RegExp("^((?=.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*|(?=.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!\u0022#$%&'() * +,./:;<=>?@[\]\^_`{|}~-]).*)");
        paRegResult = re.test($("#regPwd").val());
        if (!paRegResult) {
            $("#regPwdErrMsg").html(regFormatErrText);
        }
    } else {
        $("#regPwdErrMsg").html(regBlankErrText);
    }

    if ($("#regName").val() != "" && $("#regNickName").val() != "" && $("#regBir").val() != "" && $("#regAcc").val() != "" && paRegResult == true) {
        clearRegErrMsg();
        $.ajax({
            url: "/MemberSystem/registration",
            type: "POST",
            data: formdata,
            processData: false,
            contentType: false,
            success: function (regResult) {

                if (regResult.split(":")[1] == "暱稱及帳號已被註冊") {
                    $("#repeatErrMsg").html(regRepeatErrText);
                }

                if (regResult.split(":")[1] == "帳號已被註冊") {
                    $("#repeatErrMsg").html(regAccountErrText);
                }

                if (regResult.split(":")[1] == "暱稱已被註冊") {
                    $("#repeatErrMsg").html(regNicknameErrText);
                }

                if (regResult.split(":")[1] == "失敗") {
                    $("#repeatErrMsg").html("無效的電子郵件");
                }

                if (regResult.split(":")[1] == "成功") {
                    console.log(regResult);
                    $("#regName").val("");
                    $("#regNickName").val("");
                    $("#regBir").val("");
                    $("#regAcc").val("");
                    $("#regPwd").val("");

                    $("#navReg").html(
                        `<form id="frmRegVC" name="frmRegVC">
                            <fieldset style="border:2px solid gray; border-radius: 20px">
                                <legend style="margin-left:40px; width:60%">步驟二:帳號開通驗證</legend>
                                    <div style="margin-top:10px; margin-left:15px">
                                        <p class="row justify-content-center">已將認證碼寄送至您的信箱</p>
                                        <p class="row justify-content-center">帳號開通認證碼</p>
                                        <p class="row justify-content-center"><input type="text" id="vcIn" name="vcIn" style="font-size:larger; text-align:center" placeholder="請輸入帳號開通認證碼" /></p>
                                        <p id="vcErrMsg" class="row justify-content-center"></p>
                                        <p class="row justify-content-center mt-5"><button type="button" class="btn btn-primary" id="vcSub" style="width:20%; margin:auto">送出</button></p>
                                   </div>
                           </fieldset>
                         </form>`
                    );
                }
            }
        });
    }
}

//點擊送出
$(document).on("click", "#regSub", regChecked);

//Demo 1 - 資訊不完全(欄位空白，格式錯誤，重複註冊)
$(document).on("click", "#regDemo1", function () {
    $("#regName").val("");
    $("#regNickName").val("小蔡");
    $("#regBir").val("1990-09-18");
    $("#regAcc").val("tzy@gmail.com");
    $("#regPwd").val("a1b");
});

//Demo 2 - 正確輸入
$(document).on("click", "#regDemo2", function () {
    $("#regName").val("蔡宗穎");
    $("#regNickName").val("宗穎");
    $("#regBir").val("1990-09-18");
    $("#regAcc").val("lziytttslaeiv@gmail.com");
    $("#regPwd").val("p@sSw0rdN");
});

/**************************************************      註冊表單 - 步驟二       **************************************************/
//檢查驗證碼
$(document).on("click", "#vcSub", function () {
    let vcBlankErrorText, vcFormatErrorText;

    vcBlankErrorText = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="30"% /><span>驗證碼欄位不可空白</span>';
    vcFormatErrorText = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="30"% /><span>驗證碼錯誤</span>';

    if ($("#vcIn").val() == "") {
        $("#vcErrMsg").html(vcBlankErrorText);
    }

    if ($("#vcIn").val() != "") {
        $.ajax({
            url: "/MemberSystem/vcChecked",
            type: "POST",
            data: { "vc": $("#vcIn").val() },
            success: function (vcResult) {
                console.log(vcResult);
                if (vcResult.split(":")[1] == "失敗") {
                    $("#vcErrMsg").html(vcFormatErrorText);
                }

                //動畫待完成
                if (vcResult.split(":")[1] == "成功") {
                    $("#navReg").html(
                        `<form id="frmRegSuc" name="frmRegSuc">
                            <fieldset style="border:2px solid gray; border-radius: 20px">
                            <legend style="margin-left:40px; width:40%">步驟三:註冊成功</legend>
                            <div style="margin-top:10px; margin-left:15px">
                                <p class="row justify-content-center">註冊完成</p>

                                <p class="row justify-content-center mt-5"><button type="button" class="btn btn-primary" id="regCompleted" style="margin-left:20px; width:20%">關閉</button></p>
                            </div>
                        </fieldset>
                    </form>`
                    );
                }
            }
        });
    }
});

/**************************************************      註冊表單 - 步驟三       **************************************************/
$(document).on("click", "#regCompleted", function () {
    $("#navReg").html(
        `                      <form id="frmReg" name="frmReg">
                                    <fieldset style="border:2px solid gray; border-radius: 20px">
                                        <legend style="margin-left:40px; width:40%">步驟一:基本資訊</legend>
                                        <span id="repeatErrMsg" style="margin-top:30px; margin-left:15px"></span>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="regName">姓名：</label>
                                            <input type="text" id="regName" name="regName" placeholder="請輸入姓名" required autofocus />
                                            <span id="regNameErrMsg" style="margin-left: 8px"></span>
                                        </div>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="regNickName">暱稱：</label>
                                            <input type="text" id="regNickName" name="regNickName" placeholder="請輸入暱稱" required />
                                            <span id="regNickNameErrMsg" style="margin-left:8px"></span>
                                        </div>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="regBir">生日：</label>
                                            <input type="date" id="regBir" name="regBir" placeholder="請輸入生日" required />
                                            <span id="regBirErrMsg" style="margin-left:30px"></span>
                                        </div>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="regAcc">帳號：</label>
                                            <input type="email" id="regAcc" name="regAcc" placeholder="請輸入帳號(Email)" required />
                                            <span id="regAccErrMsg" style="margin-left:8px"></span><br />
                                            <small style="margin-left:54px">請輸入有效電子郵件地址，將作為驗證用</small>
                                        </div>
                                        <div style="margin-top:14px; margin-left:15px">
                                            <label for="regPwd">密碼：</label>
                                            <input type="password" id="regPwd" name="regPwd" placeholder="請輸入密碼" required />
                                            <span id="regPwdErrMsg" style="margin-left:8px"></span><br />
                                            <small style="margin-left:54px">至少8個字元，須包含大寫，小寫英文字母，數字及特殊符號</small>
                                        </div>
                                        <hr />
                                        <div style="margin-top:14px; margin-bottom:14px">
                                            <button type="button" id="regDemo1" style="margin-left:15px" class="btn btn-light">Demo 1</button>
                                            <button type="button" id="regDemo2" class="btn btn-light">Demo 2</button>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal" style="margin-left:20px; width:20%">退出</button>
                                            <button type="button" class="btn btn-primary" id="regSub" style="width:20%">送出</button>
                                        </div>
                                    </fieldset>
                                </form>`
    );
});

/**************************************************點擊登入分頁標籤時執行**************************************************/
/**************************************************              登入表單              **************************************************/
//清除錯誤訊息
function clearLOErrMsg() {
    $("#loAccErrMsg").html("");
    $("#loPwdErrMsg").html("");
}

//驗證功能 及 更新導覽列
function loChecked() {
    let loBlankErrMsg, loVerErrMsg;
    loBlankErrMsg = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="30"% /><span>欄位不可空白</span>';

    if ($("#loAcc").val() == "") {
        $("#loAccErrMsg").html(loBlankErrMsg);
    }

    if ($("#loPwd").val() == "") {
        $("#loPwdErrMsg").html(loBlankErrMsg);
    }

    if ($("#loAcc").val() != "" && $("#loPwd").val() != "") {
        clearLOErrMsg();
        $.ajax({
            url: "/MemberSystem/logonCheck",
            type: "POST",
            data: { "account": $("#loAcc").val(), "password": $("#loPwd").val() },
            success: function (loResult) {
                console.log(loResult);

                if (loResult.split("，")[0].split(":")[1] == "失敗") {
                    loVerErrMsg = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="30"% /><span>' + loResult.split("，")[1].split(":")[1] + '</span>';
                    $("#loPwdErrMsg").html(loVerErrMsg);
                }

                if (loResult.split("，")[0].split(":")[1] == "成功") {
                    $("#memberCurrent").html(document.cookie.split("&")[1].split("=")[1] + "，歡迎回來");


                    $("#modalLOReg").modal("hide");
                    $(".modal-backdrop").remove();

                    $(".panelLogOn").attr("style", "display:none");
                    $(".panelLogOff").attr("style", "display:block");

                    if (loResult.split("，")[1].split(":")[1] == "admin") {
                        console.log("Admin");
                        localStorage.setItem("identity","admin");
                        $("#options").html(`
                                    <a class="dropdown-item"  id="navProfilePage" no>個人頁面</a>
                                    <a class="dropdown-item" href="/Backend/Index">後臺系統</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#" id="memberLogOut">登出</a>
                         `);
                        document.location.reload();
                    } else if (loResult.split("，")[1].split(":")[1] == "member") {
                        console.log("Member");
                        localStorage.setItem("identity","member");
                        $("#options").append(`
                                    <a class="dropdown-item" id="navProfilePage"  no="">個人頁面</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="/" id="memberLogOut">登出</a>
                        `);
                        document.location.reload();
                    } else {
                        console.log("Guest");
                    }
                }
            }
        });
    }
}

//點擊送出
$("#loSub").click(loChecked);

//Demo 1 - 管理員正確輸入
$("#loDemo1").click(function () {
    $("#loAcc").val("tzy@gmail.com");
    $("#loPwd").val("p@sSw0rd1");
});

//Demo 2 - 會員正確輸入
$("#loDemo2").click(function () {
    $("#loAcc").val("lziytttslaeiv@gmail.com");
    $("#loPwd").val("p@sSw0rdN");
});

//Demo 3 - 會員正確輸入
$("#loDemo3").click(function () {
    $("#loAcc").val("zjh@gmail.com");
    $("#loPwd").val("p@sSw0rd0");
});

//Demo 4 - 會員正確輸入
$("#loDemo4").click(function () {
    $("#loAcc").val("lj@gmail.com");
    $("#loPwd").val("p@sSw0rd2");
});

//Demo 5 - 會員正確輸入
$("#loDemo5").click(function () {
    $("#loAcc").val("cyc@gmail.com");
    $("#loPwd").val("p@sSw0rd3");
});

//Demo 6 - 會員正確輸入
$("#loDemo6").click(function () {
    $("#loAcc").val("fyt@gmail.com");
    $("#loPwd").val("p@sSw0rd4");
});

//Demo 7 - 會員正確輸入
$("#loDemo7").click(function () {
    $("#loAcc").val("cpc@gmail.com");
    $("#loPwd").val("p@sSw0rd5");
});

//頁面 - 移至忘記密碼
$("#pwdFgt").click(function () {
    $("#frmLO").attr("style", "display:none");
    $("#frmPwdFgt").attr("style", "display:block");
});

/**************************************************點擊忘記密碼連結時執行**************************************************/
/**************************************************   忘記密碼表單 - 步驟一  **************************************************/
//驗證功能 及 跳轉頁面
function pmChecked() {
    let pmBlankErrMsg;
    pmBlankErrMsg = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="30"% />欄位不可空白';

    $("#pfAccErrMsg").html("");

    if ($("#pfAcc").val() == "") {
        $("#pfAccErrMsg").html(pmBlankErrMsg);
    }

    if ($("#pfAcc").val() != "") {
        $.ajax({
            url: "/MemberSystem/pmChecked",
            type: "POST",
            data: { "account": $("#pfAcc").val() },
            success: function (pfResult) {
                if (pfResult.split(":")[1] == "失敗") {
                    $("#pfAccErrMsg").html(`<img src="imgs/V/iconfinder_Symbol-Error.png" width="30"% />查無此會員`);
                }

                if (pfResult.split(":")[1] == "成功") {
                    $("#navLO").html(
                        `<form id="frmPfVC" name="frmPfVC">
                            <fieldset style="border:2px solid gray; border-radius: 20px">
                                <legend style="margin-left:40px; width:60%">會員驗證</legend>
                                    <div style="margin-top:10px; margin-left:15px">
                                        <p class="row justify-content-center">已將認證碼寄送至您的信箱</p>
                                        <p class="row justify-content-center">會員認證碼</p>
                                        <p class="row justify-content-center"><input type="text" id="vcPfIn" name="vcPfIn" style="font-size:larger; text-align:center" placeholder="請輸入會員認證碼" /></p>
                                        <p id="vcPfErrMsg" class="row justify-content-center"></p>
                                        <p class="row justify-content-center mt-5"><button type="button" class="btn btn-primary" id="vcPfSub" style="width:20%; margin:auto">送出</button></p>
                                   </div>
                           </fieldset>
                         </form>`
                    );
                }
            }
        });
    }
}

//點擊忘記密碼驗證碼
$("#pmSub").click(pmChecked);


//頁面 - 返回登入頁面
$("#prePage").click(function () {
    $("#frmPwdFgt").attr("style", "display:none");
    $("#frmLO").attr("style", "display:block");
});

/**************************************************   忘記密碼表單 - 步驟二  **************************************************/
//驗證功能 及 跳轉頁面
$(document).on("click", "#vcPfSub", function () {
    let vcPfBlankErrorText, vcPfFormatErrorText;
    vcPfBlankErrorText = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="30"% />驗證碼欄位不可空白';
    vcPfFormatErrorText = '<img src="imgs/V/iconfinder_Symbol-Error.png" width="30"% />驗證碼錯誤';

    if ($("#vcPfIn").val() == "") {
        $("#vcPfErrMsg").html(vcPfBlankErrorText);
    }

    if ($("#vcPfIn").val() != "") {
        $.ajax({
            url: "/MemberSystem/vcChecked",
            type: "POST",
            data: { "vc": $("#vcPfIn").val() },
            success: function (vcPfResult) {
                console.log(vcPfResult);
                if (vcPfResult.split(":")[1] == "失敗") {
                    $("#vcPfErrMsg").html(vcPfFormatErrorText);
                }

                //動畫待完成
                if (vcPfResult.split(":")[1] == "成功") {
                    $("#navLO").html(
                        `<form id="frmPfSuc" name="frmPfSuc">
                            <fieldset style="border:2px solid gray; border-radius: 20px">
                            <legend style="margin-left:40px; width:40%">重新設定密碼</legend>
                            <div style="margin-top:10px; margin-left:15px">
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="pfNewPwd">密碼：</label>
                                            <input type="password" id="pfNewPwd" name="pfNewPwd" placeholder="請輸入密碼" required />
                                            <span id="pfNewPwdErrMsg" style="margin-top:30px; margin-left:15px"></span>
                                        </div>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="pfNewCPwd">密碼確認：</label>
                                            <input type="password" id="pfNewCPwd" name="pfNewCPwd" placeholder="請再次輸入密碼" required />
                                            <span id="pfNewCPwdErrMsg" style="margin-top:30px; margin-left:15px"></span>
                                        </div>
                                <p class="row justify-content-center mt-5"><button type="button" class="btn btn-primary" id="pfNewSub" style="margin-left:20px; width:20%">送出</button></p>
                            </div>
                        </fieldset>
                    </form>`
                    );
                }
            }
        });
    }
});

/**************************************************   忘記密碼表單 - 步驟三  **************************************************/
//頁面 - 重新設定密碼
$(document).on("click", "#pfNewSub", function () {
    if ($("#pfNewPwd").val() == "") {
        $("#pfNewPwdErrMsg").html(`<img src="imgs/V/iconfinder_Symbol-Error.png" width="30"% />欄位不可空白`);
    }

    if ($("#pfNewCPwd").val() == "") {
        $("#pfNewCPwdErrMsg").html(`<img src="imgs/V/iconfinder_Symbol-Error.png" width="30"% />欄位不可空白`);
    }

    if ($("#pfNewCPwd").val() != "" && $("#pfNewPwd").val() != "") {
        if ($("#pfNewCPwd").val() != $("#pfNewPwd").val()) {
            $("#pfNewCPwdErrMsg").html(`<img src="imgs/V/iconfinder_Symbol-Error.png" width="30"% />密碼不一致，請重新輸入`);
        } else {
            console.log($("#pfNewPwd").val());
            console.log($("#pfNewCPwd").val());
            $.ajax({
                url: "/MemberSystem/pfResetChecked",
                type: "POST",
                data: { "pwdreset": $("#pfNewPwd").val() },
                success: function (resetResult) {
                    console.log(resetResult);
                    if (resetResult.split(":")[1] == "失敗") {
                        $("#vcErrMsg").html("修改失敗");
                    }

                    if (resetResult.split(":")[1] == "成功") {
                        $("#navLO").html(
                            `<form id="frmPfResetSuc" name="frmPfResetSuc">
                            <fieldset style="border:2px solid gray; border-radius: 20px">
                            <legend style="margin-left:40px; width:40%">密碼重設成功</legend>
                            <div style="margin-top:10px; margin-left:15px">
                                <p class="row justify-content-center">重設完成</p>
                                <p class="row justify-content-center mt-5"><button type="button" class="btn btn-primary" id="pfResetCompleted" style="margin-left:20px; width:20%">關閉</button></p>
                            </div>
                        </fieldset>
                    </form>`
                        );
                    }
                }
            });
        }
    }
});

/**************************************************   忘記密碼表單 - 步驟四  **************************************************/
//頁面 - 移至登入頁面
$(document).on("click", "#pfResetCompleted", function () {
    $("#navLO").html(
        `<form id="frmLO" name="frmLO">
                                    <fieldset style="border:2px solid gray; border-radius: 20px">
                                        <legend style="margin-left:40px; width:40%">登入資訊</legend>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="loAcc">帳號：</label>
                                            <input type="email" id="loAcc" name="loAcc" placeholder="請輸入帳號" required autofocus />
                                            <span id="loAccErrMsg" style="margin-top:30px; margin-left:15px"></span>
                                        </div>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <label for="loPwd">密碼：</label>
                                            <input type="password" id="loPwd" name="loPwd" placeholder="請輸入密碼" required />
                                            <span id="loPwdErrMsg" style="margin-top:30px; margin-left:15px"></span>
                                        </div>
                                        <div style="margin-top:10px; margin-left:15px">
                                            <a href="#frmPwdFgt" id="pwdFgt">忘記密碼</a>
                                        </div>
                                        <div style="margin-top:14px; margin-bottom:14px">
                                            <button type="button" id="loDemo1" style="margin-left:15px">Demo 1</button>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal" style="margin-left:20px; width:20%">退出</button>
                                            <button type="button" class="btn btn-primary" id="loSub" style="width:20%">送出</button>
                                        </div>
                                    </fieldset>
                                </form>`
    );
});

/**************************************************點擊登出時執行**************************************************/
$(document).on("click", "#memberLogOut", function () {
    $.ajax({
        url: "/MemberSystem/logOut",
        type: "POST",
        success: function (loResult) {
            console.log(loResult)
            if (loResult == "Y") {
                window.location = "/";
            }
        }
    });
});