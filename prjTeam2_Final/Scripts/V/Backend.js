/**************************************************    後臺系統載入時執行    **************************************************/
$(function () {
    let date = new Date;
    let day = ``;
    let HH = `${moment(Date.now()).format('HH')}`;
    let ampm = ``;
    let welc = ``;

    switch (date.getDay()) {
        case 0:
            day = "日曜日";
            break;
        case 1:
            day = "月曜日";
            break;
        case 2:
            day = "火曜日";
            break;
        case 3:
            day = "水曜日";
            break;
        case 4:
            day = "木曜日";
            break;
        case 5:
            day = "金曜日";
            break;
        case 6:
            day = "土曜日";
            break;
    }

    if (HH < "12" && HH >= "0") {
        ampm = `早安`;
    } else if (HH < "18" && HH >= "12") {
        ampm = `午安`;
    } else if (HH <= "23" && HH >= "18") {
        ampm = `晚安`;
    }

    welc = `<p style="text-align:center; font-size:30px" >今天是${moment(Date.now()).format('YYYY年MM月DD日')}，${day}</p>
                   <p style="text-align:center; font-size:30px" >${ampm}，${document.cookie.split("&")[1].split("=")[1]}</p>
                   <p style="text-align:center; font-size:30px" >歡迎回來</p>`;
    $("#v-pills-home").html(welc);
});

/**************************************************點擊個人資料標籤時執行**************************************************/
//顯示
$("#privateShow").click(function () {
    $("#privateShow").prop("disabled", true);
    $("#privateHide").prop("disabled", false);
    $("#privateUpdate").prop("disabled", false);
    $("#privateSave").prop("disabled", true);

    $.ajax({
        url: "/Backend/privateInfo",
        type: "GET",
        success: function (result) {
            $("#privateId").val(result[0].id);
            $("#privateName").val(result[0].name);
            $("#privateNickname").val(result[0].nickname);
            $("#privateBirthday").val(moment(result[0].birthday).format('YYYY-MM-DD'));
            $("#privateAccount").val(result[0].account);
            $("#privatePassword").val(result[0].password);
            $("#privateGender").val(result[0].gender);
            $("#privateOccupation").val(result[0].occupation);
            $("#privateNationality").val(result[0].nationality);
            $("#privateLivingArea").val(result[0].livingarea);
            $("#privateJLPTLevel").val(result[0].jlpt);
            $("#privateGoal").val(result[0].goal);
        }
    });
});

//隱藏
$("#privateHide").click(function () {
    $("#privateShow").prop("disabled", false);
    $("#privateHide").prop("disabled", true);
    $("#privateUpdate").prop("disabled", true);
    $("#privateSave").prop("disabled", true);

    $("#privateId").val("");
    $("#privateName").val("");
    $("#privateNickname").val("");
    $("#privateBirthday").val("");
    $("#privateAccount").val("");
    $("#privatePassword").val("");
    $("#privateGender").val("");
    $("#privateOccupation").val("");
    $("#privateNationality").val("");
    $("#privateLivingArea").val("");
    $("#privateJLPTLevel").val("");
    $("#privateGoal").val("");
});

//更新
$("#privateUpdate").click(function () {
    $("#privateShow").prop("disabled", true);
    $("#privateHide").prop("disabled", true);
    $("#privateUpdate").prop("disabled", true);
    $("#privateSave").prop("disabled", false);

    $("#privateNickname").prop("disabled", false);
    $("#privatePassword").prop("disabled", false);
    $("#privateOccupation").prop("disabled", false);
    $("#privateLivingArea").prop("disabled", false);
    $("#privateJLPTLevel").prop("disabled", false);
    $("#privateGoal").prop("disabled", false);
});

//儲存
$("#privateSave").click(function () {
    $("#privateNickname").prop("disabled", true);
    $("#privatePassword").prop("disabled", true);
    $("#privateOccupation").prop("disabled", true);
    $("#privateLivingArea").prop("disabled", true);
    $("#privateJLPTLevel").prop("disabled", true);
    $("#privateGoal").prop("disabled", true);

    $.ajax({
        url: "/Backend/privateInfoUpdate",
        type: "POST",
        data: {
            "nickname": $("#privateNickname").val(),
            "password": $("#privatePassword").val(),
            "occupation": $("#privateOccupation").val(),
            "livingarea": $("#privateLivingArea").val(),
            "jlptlevel": $("#privateJLPTLevel").val(),
            "goal": $("#privateGoal").val()
        },
        success: function (result) {
            $("#privateShow").prop("disabled", true);
            $("#privateHide").prop("disabled", false);
            $("#privateUpdate").prop("disabled", false);
            $("#privateSave").prop("disabled", true);
        }
    });
});

/**************************************************點擊會員清單標籤時執行**************************************************/
//顯示(篩選及分頁)
$("#v-pills-memberList-tab").click(function () {
    $.ajax({
        url: "/Backend/getMemberList",
        type: "GET",
        success: function (result) {
            console.log(result);
            let txt = ``;

            txt = `<h3>搜尋結果<span> - 共<b><u>${result.length}</u></b>筆資料</span></h3>`;

            txt += `<table class="table" style="margin-top:20px; font-size:20px">
                    <thead>
                        <tr>
                            <th>編號</th>
                            <th>權限</th>
                            <th>姓名</th>
                            <th>暱稱</th>
                            <th>註冊時間</th>
                            <th>帳號有效</th>
                            <th>更新</th>
                        </tr>
                    </thead>
                    <tbody>`;

            $.each(result, function (i, v) {
                txt += `
                        <tr>
                            <td>${v.id}</td>
                            <td>
                                <select name="identity${v.id}" id="identity${v.id}" disabled>
                                    <option>${v.identity}</option>
                                    <option value="admin">admin</option>
                                    <option value="member">member</option>
                                </select>
                            </td>
                            <td>${v.name}</td>
                            <td>${v.nickname}</td>
                            <td>${moment(v.registrationdate).format('YYYY-MM-DD')}</td>
                            <td>
                                <select name="alive${v.id}" id="alive${v.id}" disabled>
                                    <option>${v.alive}</option>
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </select>
                            </td>
                            <td>
                                <input type="button" id="mlEdit${v.id}" value="更新" />
                                <input type="button" id="mlSave${v.id}" value="儲存" />
                            </td>
                        </tr>`;

                //更新
                $(document).on("click", `#mlEdit${v.id}`, function () {
                    $(`#alive${v.id}`).prop("disabled", false);
                    $(`#identity${v.id}`).prop("disabled", false);
                });


                //儲存
                $(document).on("click", `#mlSave${v.id}`, function () {
                    $(`#alive${v.id}`).prop("disabled", true);
                    $(`#identity${v.id}`).prop("disabled", true);

                    $.ajax({
                        url: "/Backend/savechangesMemberList",
                        type: "POST",
                        data: { "mId": v.id, "identity": $(`#identity${v.id}`).val(), "alive": $(`#alive${v.id}`).val() },
                        success: function (result) {
                            console.log(result);
                        }
                    });
                });
            });
            txt += `</tbody></table>`;
            $("#ml").html(txt);
        }
    });
});

$(document).on("change", "#bycoIIdentity", function () {
    $("#colName").attr("style", "visibility:visible");
    $("#colAlive").attr("style", "visibility:hidden");
});

$(document).on("change", "#bycolName", function () {
    $("#colAlive").attr("style", "visibility:visible");
});

//篩選
$("#mlfilterSub").click(function () {
    console.log($("#bycoIIdentity").val(), $("#bycolName").val(), $("#bycolAlive").val());
    if ($("#bycoIIdentity").val() != null && $("#bycolName").val() != null && $("#bycolAlive").val() != null) {
        $.ajax({
            url: "/Backend/filterMemberList",
            type: "GET",
            data: { "filter1": $("#bycoIIdentity").val(), "filter2": $("#bycolName").val(), "filter3": $("#bycolAlive").val() },
            success: function (result) {
                console.log(result);
                let txt = ``;

                txt = `<h3>搜尋結果<span> - 共<b><u>${result.length}</u></b>筆資料</span></h3>`;

                txt += `<table class="table" style="margin-top:20px; font-size:20px">
                    <thead>
                        <tr>
                            <th>編號</th>
                            <th>權限</th>
                            <th>姓名</th>
                            <th>暱稱</th>
                            <th>註冊時間</th>
                            <th>帳號有效</th>
                            <th>修改</th>
                        </tr>
                    </thead>
                    <tbody>`;

                $.each(result, function (i, v) {
                    txt += `
                        <tr>
                            <td>${v.id}</td>
                            <td>
                                <select name="identity${v.id}" id="identity${v.id}" disabled>
                                    <option>${v.identity}</option>
                                    <option value="admin">admin</option>
                                    <option value="member">member</option>
                                </select>
                            </td>
                            <td>${v.name}</td>
                            <td>${v.nickname}</td>
                            <td>${moment(v.registrationdate).format('YYYY-MM-DD')}</td>
                            <td>
                                <select name="alive${v.id}" id="alive${v.id}" disabled>
                                    <option>${v.alive}</option>
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </select>
                            </td>
                            <td>
                                <input type="button" id="mlEdit${v.id}" value="修改" />
                                <input type="button" id="mlSave${v.id}" value="儲存" />
                            </td>
                        </tr>`;

                    //更改
                    $(document).on("click", `#mlEdit${v.id}`, function () {
                        $(`#alive${v.id}`).prop("disabled", false);
                        $(`#identity${v.id}`).prop("disabled", false);
                    });


                    //儲存
                    $(document).on("click", `#mlSave${v.id}`, function () {
                        $(`#alive${v.id}`).prop("disabled", true);
                        $(`#identity${v.id}`).prop("disabled", true);

                        $.ajax({
                            url: "/Backend/savechangesMemberList",
                            type: "POST",
                            data: { "mId": v.id, "identity": $(`#identity${v.id}`).val(), "alive": $(`#alive${v.id}`).val() },
                            success: function (result) {
                                console.log(result);
                            }
                        });
                    });
                });
                txt += `</tbody></table>`;
                $("#ml").html(txt);
            }
        });
    }
});

/**************************************************點擊統計圖表標籤時執行**************************************************/
//會員性別比例
$("#chart1").click(function () {
    $("#genderpercentageStatistics").attr("style", "display:block");
    $("#livingareadistributionStatistics").attr("style", "display:none");
    $("#usingtimeStatistics").attr("style", "display:none");
    $("#agerangeStatistics").attr("style", "display:none");

    $.ajax({
        url: "/Backend/getGenderPercentage",
        type: "GET",
        success: function (result) {
            console.log(result, result.length);
            let male = 0, female = 0;
            for (let i = 0; i < result.length; i++) {
                if (result[i] == true) {
                    male += 1;
                }
                if (result[i] == false) {
                    female += 1;
                }
            }
            console.log(male, male / result.length, female, female / result.length);
            //table
            $("#tGPS").html(`<h3><b>會員性別比例</b></h3>
                                                                        <table style="border:2px solid black; margin:20px auto; text-align:center; font-size:20px">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th colspan="2" style="border:2px solid black;">男性會員</th>
                                                                                    <th colspan="2" style="border:2px solid black;">女性會員</th>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th style="border:2px solid black; width:200px">男性會員數(人)</th>
                                                                                    <th style="border:2px solid black; width:200px"">男性會員比例(%)</th>
                                                                                    <th style="border:2px solid black; width:200px"">女性會員數(人)</th>
                                                                                    <th style="border:2px solid black; width:200px"">女性會員比例(%)</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style="border:2px solid black;">${male}</td>
                                                                                    <td style="border:2px solid black;">${(male / result.length * 100).toFixed(2)}</td>
                                                                                    <td style="border:2px solid black;">${female}</td>
                                                                                    <td style="border:2px solid black;">${(female / result.length * 100).toFixed(2)}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>`);

            //pie chart
            var ctx = document.getElementById('cGPS').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['女性會員(人)', '男性會員(人)'],
                    datasets: [{
                        label: '會員男女比例',
                        data: [female / result.length * 100, male / result.length * 100],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: '會員性別比例'
                        }
                    }
                }
            });
        },
    });
});

//平均年齡
$("#chart4").click(function () {
    $("#genderpercentageStatistics").attr("style", "display:none");
    $("#livingareadistributionStatistics").attr("style", "display:none");
    $("#usingtimeStatistics").attr("style", "display:none");
    $("#agerangeStatistics").attr("style", "display:block");

    $.ajax({
        url: "/Backend/getMemberAge",
        type: "GET",
        success: function (result) {
            let birthday = ``;
            let agey = ``;
            let agem = ``;
            let aged = ``;
            let currentdate = new Date();
            let mcount = 0;
            let fcount = 0;
            let mage = new Array;
            let fage = new Array;

            //會員年齡矩陣
            for (let i = 0; i < result.length; i++) {
                birthday = moment(result[i].fBirthday).format('YYYY-MM-DD');
                agey = birthday.split("-")[0];
                aged = birthday.split("-")[1];
                agem = birthday.split("-")[2];

                //男性
                if (result[i].fGender == "男") {
                    if (agem < currentdate.getMonth() + 1) {
                        mage[mcount] = currentdate.getFullYear() - agey - 1;
                    } else if (agem > currentdate.getMonth() + 1) {
                        mage[mcount] = currentdate.getFullYear() - agey;
                    } else {
                        if (aged >= currentdate.getDate()) {
                            mage[mcount] = currentdate.getFullYear() - agey;
                        }
                        mage[mcount] = currentdate.getFullYear() - agey - 1;
                    }
                    mcount += 1;
                }

                //女性
                if (result[i].fGender == "女") {
                    if (agem < currentdate.getMonth() + 1) {
                        fage[fcount] = currentdate.getFullYear() - agey - 1;
                    } else if (agem > currentdate.getMonth() + 1) {
                        fage[fcount] = currentdate.getFullYear() - agey;
                    } else {
                        if (aged >= currentdate.getDate()) {
                            fage[fcount] = currentdate.getFullYear() - agey;
                        }
                        fage[fcount] = currentdate.getFullYear() - agey - 1;
                    }
                    fcount += 1;
                }
            }

            let mgt60 = 0;
            let mgt50 = 0;
            let mgt40 = 0;
            let mgt30 = 0;
            let mgt20 = 0;
            let mgt10 = 0;
            let mlt10 = 0;
            let magearrange = ``;
            let fgt60 = 0;
            let fgt50 = 0;
            let fgt40 = 0;
            let fgt30 = 0;
            let fgt20 = 0;
            let fgt10 = 0;
            let flt10 = 0;
            let fagearrange = ``;

            //男性會員年齡區間
            for (let i = 0; i < mage.length; i++) {
                if (mage[i] >= 60) {
                    mgt60 += 1;
                } else if (mage[i] >= 50) {
                    mgt50 += 1;
                } else if (mage[i] >= 40) {
                    mgt40 += 1;
                } else if (mage[i] >= 30) {
                    mgt30 += 1;
                } else if (mage[i] >= 20) {
                    mgt20 += 1;
                } else if (mage[i] >= 10) {
                    mgt10 += 1;
                } else if (mage[i] < 10) {
                    mlt10 += 1;
                }
            }

            magearrange = `mgt60=${mgt60}-${mgt60 / mage.length},\r\nmgt50=${mgt50}-${mgt50 / mage.length},\r\nmgt40=${mgt40}-${mgt40 / mage.length},\r\nmgt30=${mgt30}-${mgt30 / mage.length},\r\nmgt20=${mgt20}-${mgt20 / mage.length},\r\nmgt10=${mgt10}-${mgt10 / mage.length},\r\nmlt10=${mlt10}-${mlt10 / mage.length}`;

            //女性會員年齡區間
            for (let j = 0; j < fage.length; j++) {
                if (fage[j] >= 60) {
                    fgt60 += 1;
                } else if (fage[j] >= 50) {
                    fgt50 += 1;
                } else if (fage[j] >= 40) {
                    fgt40 += 1;
                } else if (fage[j] >= 30) {
                    fgt30 += 1;
                } else if (fage[j] >= 20) {
                    fgt20 += 1;
                } else if (fage[j] >= 10) {
                    fgt10 += 1;
                } else if (fage[j] < 10) {
                    flt10 += 1;
                }
            }

            fagearrange = `fgt60=${fgt60}-${fgt60 / fage.length},\r\nfgt50=${fgt50}-${fgt50 / fage.length},\r\nfgt40=${fgt40}-${fgt40 / fage.length},\r\nfgt30=${fgt30}-${fgt30 / fage.length},\r\nfgt20=${fgt20}-${fgt20 / fage.length},\r\nfgt10=${fgt10}-${fgt10 / fage.length},\r\nflt10=${flt10}-${flt10 / fage.length}`;

            console.log(magearrange, fagearrange);

            //table
            let txt = ``;

            txt = `<h3><b>會員年齡區間</b></h3>`;
            txt += `<table style="text-align:center; font-size:20px">
                            <thead>
                                <tr>
                                    <th style="width:100px"></th>
                                    <th colspan="14" style="border:2px solid black" >年齡區間(歲) / 比例(%)</th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th colspan="2" style="border:2px solid black;">< 10</th>
                                    <th colspan="2" style="border:2px solid black;">10 ~ 19 </th>
                                    <th colspan="2" style="border:2px solid black;">20 ~ 29</th>
                                    <th colspan="2" style="border:2px solid black;">30 ~ 39</th>
                                    <th colspan="2" style="border:2px solid black;">40 ~ 49</th>
                                    <th colspan="2" style="border:2px solid black;">50 ~ 59</th>
                                    <th colspan="2" style="border:2px solid black;">> 60</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th style="border:2px solid black;">男性(人)</th>
                                    <td style="border:2px solid black; width:70px">${mlt10}</td>
                                    <td style="border:2px solid black; width:70px">${(mlt10 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black; width:70px">${mgt10}</td>
                                    <td style="border:2px solid black; width:70px">${(mgt10 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black; width:70px">${mgt20}</td>
                                    <td style="border:2px solid black; width:70px">${(mgt20 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black; width:70px">${mgt30}</td>
                                    <td style="border:2px solid black; width:70px">${(mgt30 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black; width:70px">${mgt40}</td>
                                    <td style="border:2px solid black; width:70px">${(mgt40 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black; width:70px">${mgt50}</td>
                                    <td style="border:2px solid black; width:70px">${(mgt50 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black; width:70px">${mgt60}</td>
                                    <td style="border:2px solid black; width:70px">${(mgt60 / mage.length * 100).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th style="border:2px solid black;">女性(人)</th>
                                    <td style="border:2px solid black;">${flt10}</td>
                                    <td style="border:2px solid black;">${(flt10 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black;">${fgt10}</td>
                                    <td style="border:2px solid black;">${(fgt10 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black;">${fgt20}</td>
                                    <td style="border:2px solid black;">${(fgt20 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black;">${fgt30}</td>
                                    <td style="border:2px solid black;">${(fgt30 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black;">${fgt40}</td>
                                    <td style="border:2px solid black;">${(fgt40 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black;">${fgt50}</td>
                                    <td style="border:2px solid black;">${(fgt50 / mage.length * 100).toFixed(2)}</td>
                                    <td style="border:2px solid black;">${fgt60}</td>
                                    <td style="border:2px solid black;">${(fgt60 / mage.length * 100).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>`;
            $("#tARS").html(txt);

            //line chart
            var ctx = document.getElementById('cARS').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['<10', '10 ~ 19', '20 ~ 29', '30 ~ 39', '40 ~ 49', '50 ~ 59', '>60'],
                    datasets: [
                        {
                            label: '女性會員(人)',
                            data: [flt10, fgt10, fgt20, fgt30, fgt40, fgt50, fgt60],
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: '男性會員(人)',
                            data: [mlt10, mgt10, mgt20, mgt30, mgt40, mgt50, mgt60],
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: '會員性別比例'
                        }
                    }
                }
            });
        }
    });
});

//居住地區分佈
$("#chart2").click(function () {
    $("#genderpercentageStatistics").attr("style", "display:none");
    $("#livingareadistributionStatistics").attr("style", "display:block");
    $("#usingtimeStatistics").attr("style", "display:none");
    $("#agerangeStatistics").attr("style", "display:none");

    $.ajax({
        url: "/Backend/getLivingareaPercentage",
        type: "GET",
        success: function (result) {
            console.log(result, result.length);
            let data = countloop(result);
            console.log(`data:${data}\r\ntype of data:${typeof (data)}`);
            console.log(data[0]);

            let laDistribution = `<h3><b>居住地區分佈</b></h3>
                                                    <table style="border:2px solid black; margin:20px auto; text-align:center; font-size:20px">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th style="border:2px solid black;">居住地區</th>
                                                                                    <th style="border:2px solid black;">會員數(人)</th>
                                                                                    <th style="border:2px solid black;">會員比例(%)</th>
                                                                                    <th style="border:2px solid black;">居住地區</th>
                                                                                    <th style="border:2px solid black;">會員數(人)</th>
                                                                                    <th style="border:2px solid black;">會員比例(%)</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>`;
            for (let i = 0; i < data.length / 2; i++) {
                laDistribution += `<tr>
                                                                                    <td style="border:2px solid black;">${data[i].split("&")[0].split(":")[1]}</td>
                                                                                    <td style="border:2px solid black;">${data[i].split("&")[1].split(":")[1]}</td>
                                                                                    <td style="border:2px solid black;">${((data[i].split("&")[1].split(":")[1] / data[i].split("&")[2].split(":")[1]) * 100).toFixed(2)}</td >
                                                                                    <td style="border:2px solid black;">${data[i + 1].split("&")[0].split(":")[1]}</td>
                                                                                    <td style="border:2px solid black;">${data[i + 1].split("&")[1].split(":")[1]}</td>
                                                                                    <td style="border:2px solid black;">${((data[i + 1].split("&")[1].split(":")[1] / data[i + 1].split("&")[2].split(":")[1]) * 100).toFixed(2)}</td>
                                                                                </tr>`;
            }
            laDistribution += `</tbody></table>`;

            //table
            $("#tLADS").html(laDistribution);

            //bar chart
            var ctx = document.getElementById('cLADS').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['臺北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣',
                        '苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣', '嘉義市',
                        '嘉義縣', '臺南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣',
                        '臺東縣', '澎湖縣', '金門縣', '連江縣'],
                    datasets: [{
                        label: '會員數量(人)',
                        data: [
                            data[0].split("&")[1].split(":")[1],
                            data[1].split("&")[1].split(":")[1],
                            data[2].split("&")[1].split(":")[1],
                            data[3].split("&")[1].split(":")[1],
                            data[4].split("&")[1].split(":")[1],
                            data[5].split("&")[1].split(":")[1],
                            data[6].split("&")[1].split(":")[1],
                            data[7].split("&")[1].split(":")[1],
                            data[8].split("&")[1].split(":")[1],
                            data[9].split("&")[1].split(":")[1],
                            data[10].split("&")[1].split(":")[1],
                            data[11].split("&")[1].split(":")[1],
                            data[12].split("&")[1].split(":")[1],
                            data[13].split("&")[1].split(":")[1],
                            data[14].split("&")[1].split(":")[1],
                            data[15].split("&")[1].split(":")[1],
                            data[16].split("&")[1].split(":")[1],
                            data[17].split("&")[1].split(":")[1],
                            data[18].split("&")[1].split(":")[1],
                            data[19].split("&")[1].split(":")[1],
                            data[20].split("&")[1].split(":")[1],
                            data[21].split("&")[1].split(":")[1],
                        ],
                    }]
                },
                options: {
                    indexAxis: 'y',
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                        bar: {
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.6)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                            ],
                            borderWidth: 2
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Horizontal Bar Chart'
                        }
                    }
                }
            });
        },
    });
});

function countloop(result) {
    let layer1;
    let layer2 = ``;
    let arr = new Array;
    let count = 0;
    let la = ``;

    for (let i = 0; i < result.length; i++) {
        layer1 = result[i];
        for (let j = 0; j < layer1.length; j++) {
            if (layer1[j] == true) {
                count += 1;
            }
        }

        la = codetransfer(i);

        /*        layer2 += `la:${la}&count:${count}&layer1:${layer1.length}\r\n`;*/
        arr[i] = `la:${la}&count:${count}&layer1:${layer1.length} \r\n`;
        count = 0;
    }
    return arr;
}

function codetransfer(i) {
    let la = ``;
    switch (i) {
        case 0:
            la = `臺北市`;
            break;
        case 1:
            la = `新北市`;
            break;
        case 2:
            la = `基隆市`;
            break;
        case 3:
            la = `桃園市`;
            break;
        case 4:
            la = `新竹市`;
            break;
        case 5:
            la = `新竹縣`;
            break;
        case 6:
            la = `苗栗縣`;
            break;
        case 7:
            la = `臺中市`;
            break;
        case 8:
            la = `彰化縣`;
            break;
        case 9:
            la = `南投縣`;
            break;
        case 10:
            la = `雲林縣`;
            break;
        case 11:
            la = `嘉義市`;
            break;
        case 12:
            la = `嘉義縣`;
            break;
        case 13:
            la = `臺南市`;
            break;
        case 14:
            la = `高雄市`;
            break;
        case 15:
            la = `屏東縣`;
            break;
        case 16:
            la = `宜蘭縣`;
            break;
        case 17:
            la = `花蓮縣`;
            break;
        case 18:
            la = `臺東縣`;
            break;
        case 19:
            la = `澎湖縣`;
            break;
        case 20:
            la = `金門縣`;
            break;
        case 21:
            la = `連江縣`;
            break;
    }
    return la;
}

//平均登入時間
$("#chart3").click(function () {
    $("#genderpercentageStatistics").attr("style", "display:none");
    $("#livingareadistributionStatistics").attr("style", "display:none");
    $("#usingtimeStatistics").attr("style", "display:block");
    $("#agerangeStatistics").attr("style", "display:none");

    $.ajax({
        url: "/Backend/getLogIORecord",
        type: "GET",
        success: function (result) {
            console.log(result, result.length);
            let data = duration(result);
            console.log(`data:${data}\r\ntype of data:${typeof (data)}`);

            let lt30 = 0;
            let gt30 = 0;
            let gt60 = 0;
            let gt90 = 0;

            for (let i = 0; i < data.length; i++) {
                if (data[i].split("&")[5] >= "90") {
                    gt90 += 1;
                }
                else if (data[i].split("&")[5] >= "60") {
                    gt60 += 1;
                }
                else if (data[i].split("&")[5] >= "30") {
                    gt30 += 1;
                }
                else if (data[i].split("&")[5] < "30") {
                    lt30 += 1;
                }
            }

            console.log(lt30, lt30 / data.length, gt30, gt30 / data.length, gt60, gt60 / data.length, gt90, gt90 / data.length);

            $("#tUSS").html(`<h3><b>平均登入時間</b></h3>
                                                                        <table style="border:2px solid black; margin:20px auto; text-align:center; font-size:20px">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th colspan="4" style="border:2px solid black">平均登入時間(分鐘)(%)</th>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th style="border:2px solid black; width:200px">< 30</th>
                                                                                    <th style="border:2px solid black; width:200px">30 ~ 59</th>
                                                                                    <th style="border:2px solid black; width:200px">60 ~ 89</th>
                                                                                    <th style="border:2px solid black; width:200px">> 90</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style="border:2px solid black; width:200px">${(lt30 / data.length * 100).toFixed(2)}</td>
                                                                                    <td style="border:2px solid black; width:200px">${(gt30 / data.length * 100).toFixed(2)}</td>
                                                                                    <td style="border:2px solid black; width:200px">${(gt60 / data.length * 100).toFixed(2)}</td>
                                                                                    <td style="border:2px solid black; width:200px">${(gt90 / data.length * 100).toFixed(2)}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
             `);

            //doughnut chart
            var ctx = document.getElementById('cUSS').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['少於30分鐘', '30 - 59分鐘', '60 ~ 89分鐘', '多於90分鐘'],
                    datasets: [{
                        label: '平均登入時間',
                        data: [
                            (lt30 / data.length * 100).toFixed(2),
                            (gt30 / data.length * 100).toFixed(2),
                            (gt60 / data.length * 100).toFixed(2),
                            (gt90 / data.length * 100).toFixed(2)
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 255, 100, 0.6)',
                            'rgba(0, 255, 43, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 255, 100, 1)',
                            'rgba(0, 255, 43, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: '平均登入時間'
                        }
                    }
                }
            });
        }
    });
});

function duration(result) {
    let on = 0;
    let off = 0;
    let Hdif = 0;
    let Mdif = 0;
    let Mtotal = 0;
    let dur = 0;
    let arr = new Array;

    for (let i = 0; i < result.length; i++) {
        on = moment(result[i].lond).format('YYYY-MM-DD_hh:mm:ss');
        off = moment(result[i].loffd).format('YYYY-MM-DD_hh:mm:ss');
        Hdif = off.split(`_`)[1].split(`:`)[0] - on.split(`_`)[1].split(`:`)[0];
        Mdif = off.split(`_`)[1].split(`:`)[1] - on.split(`_`)[1].split(`:`)[1];

        if (Hdif > 0) {
            Mtotal = Hdif * 60;
            if (Mdif != 0) {
                Mtotal = Mtotal + Mdif;
            }
        }

        if (Hdif == 0) {
            if (Mdif != 0) {
                Mtotal = Mdif;
            }
        }

        arr[i] = `${i}&${on}&${off}&${Hdif}&${Mdif}&${Mtotal}\r\n`;
    }
    return arr;
}
