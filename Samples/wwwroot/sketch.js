let connection;
function setup() {
    createCanvas(640, 480);
    rect(0, 0, 639, 479);
    frameRate(30);
    strokeWeight(3);
    // ↓追加↓
    connection = new signalR.HubConnection('/draw');
    //↓クライアントのdraw_clientメソッドの定義。draw_clientメソッドでメッセージが来たら実行する
    connection.on('draw_client', function (prev_x, prev_y, x, y) {
        line(prev_x, prev_y, x, y)
    });
    connection.start(); //接続開始
    // ↑ここまで↑
}
let past_x = 0;
let past_y = 0;

function draw() {
    if (mouseIsPressed) {
        drawLineonSelf();
        past_x = mouseX;
        past_y = mouseY;
    }
}
function mousePressed() {
    past_x = mouseX;
    past_y = mouseY;
}
function drawLineonSelf() {
    if (past_x != mouseX || past_y != mouseY) {
        line(mouseX, mouseY, past_x, past_y);
        //サーバーのdraw_serverメソッドを呼び出します
        connection.invoke('draw_server', past_x, past_y, mouseX, mouseY);
    }
}