 var parameters = {
        src: "",
        autoPlay: "false",
        verbose: true,
        controlBarAutoHide: "true",
        controlBarPosition: "bottom",
        poster: "images/poster.png",
        plugin_hls: "swf/wmp_plugin_hls.swf",
        javascriptCallbackFunction: "onJavaScriptBridgeCreated"
      };

      var player = null;
      function play() {
        player = null;
        swfobject.embedSWF(
          "swf/woan_wmp.swf"
          , "woan_player"
          , 640
          , 480
          , "10.1.0"
          , "expressInstall.swf"
          , parameters
          , {
            allowFullScreen: "true",
            wmode: "opaque"
          }
          , { name: "woan_player" }
        );
      }

      $(function() {
        parameters.src = $("button.play").attr('data');
        play();

        $("button.play").click(function() {
          parameters.src = $(this).attr('data');
          play();
        });


        $(window).keypress(function(e) {
          var key = e.which;
          /*按键1选择播放器被聚焦*/
          if (key === 49) {
            player = document.getElementById("woan_player");
            player.focus();
          }
        });

        //播放，暂停的按钮响应
        $("#btn_pp").click(function(){
          player = document.getElementById("woan_player");
          var state = player.getState();
          if (state == "ready" || state == "paused") {
            player.play2();
          } else if (state == "playing") {
            player.pause();
          }
        });
      });
      function onCurrentTimeChange(time, playerId) {
        document.getElementById("currentTime").innerHTML = time;    
      }

      function onDurationChange(time, playerId) {
        document.getElementById("duration").innerHTML = time; 
      }

      function onComplete(playerId) {
        console.log("play end");
      }

      function onMediaPlayerStateChange(state, playerId) {
        console.log("state change: " + state);
        switch(state) {
          case "playing":
            $("#btn_pp").prop('value', '暂停'); 
            break;
          case "paused":
            $("#btn_pp").prop('value', '播放'); 
            break;
          case "ready":
            $("#btn_pp").prop('value', '播放'); 
            break;
        } 
      }
      
      function onJavaScriptBridgeCreated(playerId, event_str) {
        if ("onJavaScriptBridgeCreated" != event_str) {
          return;
        }
        player = document.getElementById(playerId);
        //监听播放时间与时长事件
        player.addEventListener("currentTimeChange", "onCurrentTimeChange");
        player.addEventListener("durationChange", "onDurationChange");
        player.addEventListener("complete", "onComplete");
        player.addEventListener("mediaPlayerStateChange", "onMediaPlayerStateChange");
      }     