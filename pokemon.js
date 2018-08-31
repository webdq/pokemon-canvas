/**
 * create a pokemon of [object canvas]
 * @preserve
 * @version  1.4
 * @return  [class Pokemon]
 * @author  [webdq]
 * @email  [d312697510@126.com]
 * @github https://github.com/webdq/pokemon-canvas
 * @design from http://pokepalettes.com/
 */

;(function(window,undefined){

  function hasPoke(){
    var keys = Object.keys(window);
    var reg = /^poke(_\d+){1,2}$/;
    for(var i=0; i<keys.length; i++){
      if(reg.test(keys[i])){
        return true;
      }
    }
    return false;
  }

  if(!hasPoke()){
    console.error('[poke_\\d.js] data is required,and it\'s included before pokemon_canvas.js');
    return;
  }

  var Pokemon = function(id,option){
    this.id = 0;
    this.canvas = null;
    this.canvas_width = 100;
    this.canvas_height = 100;
    this.color = [];
    this.rect = [];
    this.pixel = 1;

    this.init(id,option);
    this.getPoke();
    this.draw();
  };

  Pokemon.prototype.init = function(id,option){
    id = parseInt(id);
    id = (isNaN(id) || id < 0) ? 0 : id;
    this.id = id;
    if(option && typeof option == 'object'){
      var pixel = parseInt(option.pixel);
      if(option.pixel && !isNaN(pixel)){
        this.pixel = pixel;
      }
    }
  }

  Pokemon.prototype.getPoke = function(){
    var id = this.id;
    var poke = null;
    if(window['poke_'+id]){
      poke = window['poke_'+id][id];
    }else if(id >= 1 && id <= 151){
      if(window['poke_1_151']) poke = window['poke_1_151'][id];
    }else if(id >= 152 && id <= 251){
      if(window['poke_152_251']) poke = window['poke_152_251'][id];
    }else if(id >= 252 && id <= 386){
      if(window['poke_252_386']) poke = window['poke_252_386'][id];
    }else if(id >= 387 && id <= 494){
      if(window['poke_387_494']) poke = window['poke_387_494'][id];
    }else if(id >= 495 && id <= 649){
      if(window['poke_495_649']) poke = window['poke_495_649'][id];
    }

    this.id = poke ? id : 0;
    this.canvas_width = poke ? poke.width : 100;
    this.canvas_height = poke ? poke.height : 100;
    this.color = poke ? poke.color: [];
    this.rect = poke ? poke.rect : [];
  }

  Pokemon.prototype.draw = function(){
    this.canvas = window.document.createElement('canvas');
    this.canvas.setAttribute("width",this.canvas_width*this.pixel);
    this.canvas.setAttribute("height",this.canvas_height*this.pixel);
    var ctx = this.canvas.getContext("2d");

    for(var i=0; i<this.rect.length; i++){
      var row = this.rect[i];
      for(var j=0; j<row.length; j++){
        var x = this.pixel * j;
        var y = this.pixel * i;
        ctx.fillStyle = this.color[row[j]];
        ctx.fillRect(x,y,this.pixel,this.pixel);
      }
    }
  }

  Pokemon.prototype.go = function(){
    return this.canvas;
  }

  Pokemon.prototype.getId = function(){
    return this.id;
  }

  Pokemon.prototype.getName = function(lang){
    var langArr = this.lang[lang] ? this.lang[lang] : this.lang['en'];
    return langArr[this.id-1] ? langArr[this.id-1] : '';
  }

  Pokemon.prototype.setId = function(id){
    this.init(id);
    this.getPoke();
    this.draw();
  }

  Pokemon.prototype.lang = {
    en: ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran♀","Nidorina","Nidoqueen","Nidoran♂","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch’d","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew","Chikorita","Bayleef","Meganium","Cyndaquil","Quilava","Typhlosion","Totodile","Croconaw","Feraligatr","Sentret","Furret","Hoothoot","Noctowl","Ledyba","Ledian","Spinarak","Ariados","Crobat","Chinchou","Lanturn","Pichu","Cleffa","Igglybuff","Togepi","Togetic","Natu","Xatu","Mareep","Flaaffy","Ampharos","Bellossom","Marill","Azumarill","Sudowoodo","Politoed","Hoppip","Skiploom","Jumpluff","Aipom","Sunkern","Sunflora","Yanma","Wooper","Quagsire","Espeon","Umbreon","Murkrow","Slowking","Misdreavus","Unown","Wobbuffet","Girafarig","Pineco","Forretress","Dunsparce","Gligar","Steelix","Snubbull","Granbull","Qwilfish","Scizor","Shuckle","Heracross","Sneasel","Teddiursa","Ursaring","Slugma","Magcargo","Swinub","Piloswine","Corsola","Remoraid","Octillery","Delibird","Mantine","Skarmory","Houndour","Houndoom","Kingdra","Phanpy","Donphan","Porygon2","Stantler","Smeargle","Tyrogue","Hitmontop","Smoochum","Elekid","Magby","Miltank","Blissey","Raikou","Entei","Suicune","Larvitar","Pupitar","Tyranitar","Lugia","Ho-Oh","Celebi","Treecko","Grovyle","Sceptile","Torchic","Combusken","Blaziken","Mudkip","Marshtomp","Swampert","Poochyena","Mightyena","Zigzagoon","Linoone","Wurmple","Silcoon","Beautifly","Cascoon","Dustox","Lotad","Lombre","Ludicolo","Seedot","Nuzleaf","Shiftry","Taillow","Swellow","Wingull","Pelipper","Ralts","Kirlia","Gardevoir","Surskit","Masquerain","Shroomish","Breloom","Slakoth","Vigoroth","Slaking","Nincada","Ninjask","Shedinja","Whismur","Loudred","Exploud","Makuhita","Hariyama","Azurill","Nosepass","Skitty","Delcatty","Sableye","Mawile","Aron","Lairon","Aggron","Meditite","Medicham","Electrike","Manectric","Plusle","Minun","Volbeat","Illumise","Roselia","Gulpin","Swalot","Carvanha","Sharpedo","Wailmer","Wailord","Numel","Camerupt","Torkoal","Spoink","Grumpig","Spinda","Trapinch","Vibrava","Flygon","Cacnea","Cacturne","Swablu","Altaria","Zangoose","Seviper","Lunatone","Solrock","Barboach","Whiscash","Corphish","Crawdaunt","Baltoy","Claydol","Lileep","Cradily","Anorith","Armaldo","Feebas","Milotic","Castform","Kecleon","Shuppet","Banette","Duskull","Dusclops","Tropius","Chimecho","Absol","Wynaut","Snorunt","Glalie","Spheal","Sealeo","Walrein","Clamperl","Huntail","Gorebyss","Relicanth","Luvdisc","Bagon","Shelgon","Salamence","Beldum","Metang","Metagross","Regirock","Regice","Registeel","Latias","Latios","Kyogre","Groudon","Rayquaza","Jirachi","Deoxys","Turtwig","Grotle","Torterra","Chimchar","Monferno","Infernape","Piplup","Prinplup","Empoleon","Starly","Staravia","Staraptor","Bidoof","Bibarel","Kricketot","Kricketune","Shinx","Luxio","Luxray","Budew","Roserade","Cranidos","Rampardos","Shieldon","Bastiodon","Burmy","Wormadam","Mothim","Combee","Vespiquen","Pachirisu","Buizel","Floatzel","Cherubi","Cherrim","Shellos","Gastrodon","Ambipom","Drifloon","Drifblim","Buneary","Lopunny","Mismagius","Honchkrow","Glameow","Purugly","Chingling","Stunky","Skuntank","Bronzor","Bronzong","Bonsly","Mime Jr.","Happiny","Chatot","Spiritomb","Gible","Gabite","Garchomp","Munchlax","Riolu","Lucario","Hippopotas","Hippowdon","Skorupi","Drapion","Croagunk","Toxicroak","Carnivine","Finneon","Lumineon","Mantyke","Snover","Abomasnow","Weavile","Magnezone","Lickilicky","Rhyperior","Tangrowth","Electivire","Magmortar","Togekiss","Yanmega","Leafeon","Glaceon","Gliscor","Mamoswine","Porygon-Z","Gallade","Probopass","Dusknoir","Froslass","Rotom","Uxie","Mesprit","Azelf","Dialga","Palkia","Heatran","Regigigas","Giratina","Cresselia","Phione","Manaphy","Darkrai","Shaymin","Arceus","Victini","Snivy","Servine","Serperior","Tepig","Pignite","Emboar","Oshawott","Dewott","Samurott","Patrat","Watchog","Lillipup","Herdier","Stoutland","Purrloin","Liepard","Pansage","Simisage","Pansear","Simisear","Panpour","Simipour","Munna","Musharna","Pidove","Tranquill","Unfezant","Blitzle","Zebstrika","Roggenrola","Boldore","Gigalith","Woobat","Swoobat","Drilbur","Excadrill","Audino","Timburr","Gurdurr","Conkeldurr","Tympole","Palpitoad","Seismitoad","Throh","Sawk","Sewaddle","Swadloon","Leavanny","Venipede","Whirlipede","Scolipede","Cottonee","Whimsicott","Petilil","Lilligant","Basculin","Sandile","Krokorok","Krookodile","Darumaka","Darmanitan","Maractus","Dwebble","Crustle","Scraggy","Scrafty","Sigilyph","Yamask","Cofagrigus","Tirtouga","Carracosta","Archen","Archeops","Trubbish","Garbodor","Zorua","Zoroark","Minccino","Cinccino","Gothita","Gothorita","Gothitelle","Solosis","Duosion","Reuniclus","Ducklett","Swanna","Vanillite","Vanillish","Vanilluxe","Deerling","Sawsbuck","Emolga","Karrablast","Escavalier","Foongus","Amoonguss","Frillish","Jellicent","Alomomola","Joltik","Galvantula","Ferroseed","Ferrothorn","Klink","Klang","Klinklang","Tynamo","Eelektrik","Eelektross","Elgyem","Beheeyem","Litwick","Lampent","Chandelure","Axew","Fraxure","Haxorus","Cubchoo","Beartic","Cryogonal","Shelmet","Accelgor","Stunfisk","Mienfoo","Mienshao","Druddigon","Golett","Golurk","Pawniard","Bisharp","Bouffalant","Rufflet","Braviary","Vullaby","Mandibuzz","Heatmor","Durant","Deino","Zweilous","Hydreigon","Larvesta","Volcarona","Cobalion","Terrakion","Virizion","Tornadus","Thundurus","Reshiram","Zekrom","Landorus","Kyurem","Keldeo","Meloetta","Genesect"],
    zh: ["妙蛙种子","妙蛙草","妙蛙花","小火龙","火恐龙","喷火龙","杰尼龟","卡咪龟","水箭龟","绿毛虫","铁甲蛹","巴大蝶","独角虫","铁壳蛹","大针蜂","波波","比比鸟","大比鸟","小拉达","拉达","烈雀","大嘴雀","阿柏蛇","阿柏怪","皮卡丘","雷丘","穿山鼠","穿山王","尼多兰","尼多娜","尼多后","尼多朗","尼多力诺","尼多王","皮皮","皮可西","六尾","九尾","胖丁","胖可丁","超音蝠","大嘴蝠","走路草","臭臭花","霸王花","派拉斯","派拉斯特","毛球","摩鲁蛾","地鼠","三地鼠","喵喵","猫老大","可达鸭","哥达鸭","猴怪","火爆猴","卡蒂狗","风速狗","蚊香蝌蚪","蚊香君","蚊香泳士","凯西","勇基拉","胡地","腕力","豪力","怪力","喇叭芽","口呆花","大食花","玛瑙水母","毒刺水母","小拳石","隆隆石","隆隆岩","小火马","烈焰马","呆呆兽","呆壳兽","小磁怪","三合一磁怪","大葱鸭","嘟嘟","嘟嘟利","小海狮","白海狮","臭泥","臭臭泥","大舌贝","刺甲贝","鬼斯","鬼斯通","耿鬼","大岩蛇","催眠貘","引梦貘人","大钳蟹","巨钳蟹","霹雳电球","顽皮雷弹","蛋蛋","椰蛋树","卡拉卡拉","嘎啦嘎啦","飞腿郎","快拳郎","大舌头","瓦斯弹","双弹瓦斯","独角犀牛","钻角犀兽","吉利蛋","蔓藤怪","袋兽","墨海马","海刺龙","角金鱼","金鱼王","海星星","宝石海星","魔墙人偶","飞天螳螂","迷唇姐","电击兽","鸭嘴火兽","凯罗斯","肯泰罗","鲤鱼王","暴鲤龙","拉普拉斯","百变怪","伊布","水伊布","雷伊布","火伊布","多边兽","菊石兽","多刺菊石兽","化石盔","镰刀盔","化石翼龙","卡比兽","急冻鸟","闪电鸟","火焰鸟","迷你龙","哈克龙","快龙","超梦","梦幻","菊草叶","月桂叶","大菊花","火球鼠","火岩鼠","火暴兽","小锯鳄","蓝鳄","大力鳄","尾立","大尾立","咕咕","猫头夜鹰","芭瓢虫","安瓢虫","线球","阿利多斯","叉字蝠","灯笼鱼","电灯怪","皮丘","皮宝宝","宝宝丁","波克比","波克基古","天然雀","天然鸟","咩利羊","绵绵","电龙","美丽花","玛力露","玛力露丽","树才怪","蚊香蛙皇","毽子草","毽子花","毽子绵","长尾怪手","向日种子","向日花怪","阳阳玛","乌波","沼王","太阳精灵","月精灵","黑暗鸦","河马王","梦妖","未知图腾","果然翁","麒麟奇","榛果球","佛烈托斯","土龙弟弟","天蝎","大钢蛇","布卢","布卢皇","千针鱼","巨钳螳螂","壶壶","赫拉克罗斯","狃拉","熊宝宝","圈圈熊","熔岩虫","熔岩蜗牛","小山猪","长毛猪","太阳珊瑚","铁炮鱼","章鱼桶","信使鸟","巨翅飞鱼","盔甲鸟","戴鲁比","黑鲁加","刺龙王","小小象","顿甲","3D龙II","惊角鹿","图图犬","巴尔郎","柯波朗","迷唇娃","电击怪","小鸭嘴龙","大奶罐","幸福蛋","雷公","炎帝","水君","由基拉","沙基拉","班吉拉","洛奇亚","凤王","雪拉比","木守宫","森林蜥蜴","蜥蜴王","火稚鸡","力壮鸡","火焰鸡","水跃鱼","沼跃鱼","巨沼怪","土狼犬","大狼犬","蛇纹熊","直冲熊","刺尾虫","甲壳蛹","狩猎凤蝶","盾甲茧","毒粉蝶","莲叶童子","莲帽小童","乐天河童","橡实果","长鼻叶","狡猾天狗","傲骨燕","大王燕","长翅鸥","大嘴鸥","拉鲁拉丝","奇鲁莉安","沙奈朵","溜溜糖球","雨翅蛾","蘑蘑菇","斗笠菇","懒人翁","过动猿","请假王","土居忍士","铁面忍者","脱壳忍者","咕妞妞","吼爆弹","爆音怪","幕下力士","超力王","露力丽","朝北鼻","向尾喵","优雅猫","勾魂眼","大嘴娃","可可多拉","可多拉","波士可多拉","玛沙那","恰雷姆","落雷兽","雷电兽","正电拍拍","负电拍拍","电萤虫","甜甜萤","毒蔷薇","溶食兽","吞食兽","利牙鱼","巨牙鲨","吼吼鲸","吼鲸王","呆火驼","喷火驼","煤炭龟","跳跳猪","噗噗猪","晃晃斑","大颚蚁","超音波幼虫","沙漠蜻蜓","沙漠奈亚","梦歌奈亚","青绵鸟","七夕青鸟","猫鼬斩","饭匙蛇","月石","太阳岩","泥泥鳅","鲶鱼王","龙虾小兵","铁螯龙虾","天秤偶","念力土偶","触手百合","摇篮百合","太古羽虫","太古盔甲","笨笨鱼","美纳斯","漂浮泡泡","变隐龙","怨影娃娃","诅咒娃娃","夜骷颅","夜巨人","热带龙","风铃铃","阿勃梭鲁","小果然","雪童子","冰鬼护","海豹球","海魔狮","帝牙海狮","珍珠贝","猎斑鱼","樱花鱼","古空棘鱼","爱心鱼","宝贝龙","甲壳龙","暴飞龙","铁哑铃","金属怪","巨金怪","雷吉洛克","雷吉艾斯","雷吉斯奇鲁","拉帝亚斯","拉帝欧斯","盖欧卡","固拉多","烈空坐","基拉祈","代欧奇希斯","草苗龟","树林龟","土台龟","小火焰猴","猛火猴","烈焰猴","波加曼","波皇子","帝王拿波","姆克儿","姆克鸟","姆克鹰","大牙狸","大尾狸","圆法师","音箱蟀","小猫怪","勒克猫","伦琴猫","含羞苞","罗丝雷朵","头盖龙","战槌龙","盾甲龙","护城龙","结草儿","结草贵妇","绅士蛾","三蜜蜂","蜂后","帕奇利兹","泳气鼬","浮潜鼬","樱花宝","樱花儿","无壳海牛","海牛兽","双尾怪手","飘飘球","附和气球","卷卷耳","长耳兔","梦妖魔","乌鸦头头","魅力喵","东施喵","铃铛响","臭鼬噗","坦克臭鼬","铜镜怪","青铜钟","爱哭树","魔尼尼","好运蛋","聒噪鸟","花岩怪","圆陆鲨","尖牙陆鲨","烈咬陆鲨","小卡比兽","利欧路","路卡利欧","怪河马","河马兽","紫天蝎","龙王蝎","不良蛙","毒骷蛙","尖牙笼","萤光鱼","霓虹鱼","小球飞鱼","雪笠怪","暴雪王","玛狃拉","自爆磁怪","大舌舔","超铁暴龙","巨蔓藤","电击魔兽","鸭嘴焰龙","波克基斯","梅卡阳玛","叶精灵","冰精灵","天蝎王","象牙猪","3D龙Z","艾路雷朵","大朝北鼻","夜黑魔人","雪妖女","洛托姆","由克希","艾姆利多","亚克诺姆","帝牙卢卡","帕路奇犽","席多蓝恩","雷吉奇卡斯","骑拉帝纳","克雷色利亚","霏欧纳","玛纳霏","达克莱伊","谢米","阿尔宙斯","比克提尼","藤藤蛇","青藤蛇","君主蛇","暖暖猪","炒炒猪","炎武王","水水獭","双刃丸","大剑鬼","探探鼠","步哨鼠","小约克","哈约克","长毛狗","扒手猫","酷豹","花椰猴","花椰猿","爆香猴","爆香猿","冷水猴","冷水猿","食梦梦","梦梦蚀","豆豆鸽","波波鸽","轰隆雉鸡","斑斑马","雷电斑马","石丸子","地幔岩","庞岩怪","滚滚蝙蝠","心蝙蝠","螺钉地鼠","龙头地鼠","差不多娃娃","搬运小匠","铁骨土人","修缮老头","圆蝌蚪","蓝蟾蜍","蟾蜍王","投射鬼","打击鬼","虫宝包","宝包茧","保母虫","百足蜈蚣","车轮球","蜈蚣王","木棉球","风妖精","百合根娃娃","裙儿小姐","勇士鲈鱼","黑眼鳄","混混鳄","流氓鳄","火红不倒翁","达摩狒狒","街头沙铃","石居蟹","岩殿居蟹","滑头小子","头巾混混","象征鸟","哭哭面具","死神棺","原盖海龟","肋骨海龟","始祖小鸟","始祖大鸟","破破袋","灰尘山","索罗亚","索罗亚克","泡沫栗鼠","奇诺栗鼠","哥德宝宝","哥德小童","哥德小姐","单卵细胞球","双卵细胞球","人造细胞卵","鸭宝宝","首席天鹅","迷你冰","多多冰","双倍多多冰","四季鹿","芽吹鹿","电飞鼠","盖盖虫","骑士蜗牛","宝贝球菇","暴露菇","轻飘飘","胖嘟嘟","保母曼波","电电虫","电蜘蛛","种子铁球","坚果哑铃","齿轮儿","齿轮组","齿轮怪","麻麻小鱼","麻麻鳗","麻麻鳗鱼王","小灰怪","大宇怪","烛光灵","灯火幽灵","水晶灯火灵","牙牙","斧牙龙","双斧战龙","喷嚏熊","冻原熊","几何雪花","小嘴蜗","敏捷虫","泥巴鱼","功夫鼬","师父鼬","赤面龙","泥偶小人","泥偶巨人","驹刀小兵","劈斩司令","爆爆头水牛","毛头小鹰","勇士鹰","秃鹰小子","秃鹰娜","食蚁炉","铁蚁","单首龙","双头龙","三头龙","燃烧虫","火神虫","勾帕路翁","代拉基翁","毕力吉翁","龙卷云","雷电云","雷希拉姆","捷克罗姆","土地云","酋雷姆","凯路迪欧","美洛耶塔","盖诺赛克特"]
  }

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = Pokemon;
  } else {
    if ( typeof define === "function" && define.amd ) {
      define( "Pokemon", [], function () { return Pokemon; } );
    }
  }

  if ( typeof window === "object" && typeof window.document === "object" ) {
    window.Pokemon = Pokemon;
  }

})(window);