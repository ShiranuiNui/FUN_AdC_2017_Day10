using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
namespace whiteboard_signalr
{
    public class WhiteboardHub : Hub //Hubクラスを継承しています
    {
        public Task Draw_Server(int prevX, int prevY, int currentX, int currentY)
        {
            // 送ってきたクライアント以外クライアントの、draw_clientメソッドを呼び出します
            // this.Context.ConnectionIdがリクエストを送ってきたクライアントです

            // InvokeAsync(string: クライアントのメソッド名, object:送るデータ)
            return Clients.AllExcept(new List<string> { this.Context.ConnectionId }).InvokeAsync("draw_client", prevX, prevY, currentX, currentY);
        }
    }
}