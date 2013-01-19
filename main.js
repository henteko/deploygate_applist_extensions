var BASE_URL = "https://deploygate.com";
$(function () {
    //ダッシュボードにアクセスして管理してるアプリ一覧を取得する
    $.get(BASE_URL + "/dashboard", function (data) {
        var $body = $(data); 
        var $widget = $(data).find(".widget");
        var $span3s = $widget.find(".row").find(".span3"); 
        var $links = $span3s.children("a");
        var $strongs = $span3s.find("strong");
        var $ver = $span3s.find("small.muted");

        var $ul = $("<ul>");
        $.each($links, function(id) {
            var $li = $("<li>");

            var $_link = $($links[id]);
            $icon = $_link.find("img").attr("src", BASE_URL + $_link.find("img").attr("src"));
            name = $($strongs[id]).find("a").text() + $($ver[id]).text();
            var $link = $("<a class='icon' href=" + BASE_URL + $_link.attr("href") + " title=" + name + "></a>");
            $link.append($icon);
            $link.append($("<span class='name'>" + name + "</span>"));
            $link.click(function(e){
                chrome.tabs.create({url: $(this).attr("href")});
            });
            $li.append($link);

            $ul.append($li);
        });

        $("body").append($ul);
chrome.alarms.create('refreshDeployGate', {periodInMinutes: 0.1});
chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log("hoge");
});



    });
});
