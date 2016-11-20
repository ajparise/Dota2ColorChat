$(function() {

    function ColorScheme(colorizer, colorList) {
        this.Colors = colorList;
        this.Colorize = function(phrase) {
            return colorizer(this.Colors, phrase);
        }
    }

    function LinearColorizer(colorList, phrase) {
        var colorText = '';
        var idx = 0;
            for(var i = 0; i < phrase.length; i++)
            {
                if (phrase[i] != ' ') {
                    colorText += colorList[idx++];                    
                    if (idx == colorList.length)
                        idx = 0;
                }
                colorText += phrase[i];
            }
        return colorText;
    }

    var ChatColors = {
            AllColors : {
                Olive:'\u0010',
                Pink:'\u0011',
                Red:'\u0012',
                Orange:'\u0013',
                Dark_yellow:'\u0014',
                Light_green:'\u0015',
                Purple:'\u0016',
                Grey:'\u0017',
                Green:'\u0018',
                Blue:'\u0019',
                Brown:'\u000B',
                Lime_green:'\u000C',
                Hot_pink:'\u000E',
                Vibrant_orange:'\u000F',
                Violet:'\u001A',
                Redish_pink:'\u001C'
            },
            Schemes : {}
    }
  
    // Setup Color Schemes
    ChatColors.Schemes.Rainbow_Colors = new ColorScheme(LinearColorizer, [ChatColors.AllColors.Red, ChatColors.AllColors.Orange, ChatColors.AllColors.Dark_yellow, ChatColors.AllColors.Lime_green, ChatColors.AllColors.Blue, ChatColors.AllColors.Purple, ChatColors.AllColors.Violet]);    
    ChatColors.Schemes.All_Colors = new ColorScheme(LinearColorizer, $.map(ChatColors.AllColors, function(value, idx) { return [value]; }));
    ChatColors.Schemes.Custom_Colors = new ColorScheme(LinearColorizer, []);
    
    // Load Color Schemes into Select List
    $.each(Object.keys(ChatColors.Schemes), function(key, value) {   
        $('#colorScheme')
            .append($('<option>', { value : value })
            .text(value)); 
    });

    // Load All Colors into Custom Select List
    $.each(Object.keys(ChatColors.AllColors), function(key, value) {   
        $('#customColorScheme')
            .append($('<option>', { value : ChatColors.AllColors[value] })
            .text(value)); 
    });

    // Colorize all the text when you press keys
    $('#chatText').keyup(function() {
        var scheme = ChatColors.Schemes[$("#colorScheme option:selected").val()]
        var phrase = $(this).val();        
        $('#colorText').val(scheme.Colorize(phrase));
    });

    // Do stuff it preset changes
    $("#colorScheme").change(function() {
        if ($("#colorScheme option:selected").val() == "Custom_Colors") {
            $('#customColorSchemeDisplay').show();
        } else {
            $('#customColorSchemeDisplay').hide();
        }
        $('#chatText').keyup();
    });

    // Chosen
    var config = {
      '.chosen-select'     : {width:"95%"}
    }

    // Update custom colors from selection and recolorize
    for (var selector in config) {
      $(selector).chosen(config[selector]).on('change', function(evt, params) {
          ChatColors.Schemes.Custom_Colors.Colors =  $( this ).val();
          $('#chatText').keyup();
      });
    }    
      
});