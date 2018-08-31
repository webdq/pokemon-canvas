# 说明

## pokemon.js可以创建一个canvas绘制的pokemon

## 图片设计来源：http://pokepalettes.com/

------

## 版本 1.4
- pokemon数量 NO.495-649

## 版本 1.3
- pokemon数量 NO.387-494

## 版本 1.2
- pokemon数量 NO.252-386

## 版本 1.1
- pokemon数量 NO.152-251

## 版本 1.0
- pokemon数量 NO.1-151

------

# 目录

```
+ demo 示例文件
+ dist 输出文件
+ images 图片
+ src 模块
```

# 引入

```
poke.js模块要在pokemon.js之前引入

引入单个模块 [poke_1.js , poke_2.js , ...]
<script src="./dist/poke_modules/poke_1.js"></script>

引入集合模块 [poke_1_151.js , poke_152_251.js , poke_251_386.js]
<script src="./dist/poke_modules/poke_1_151.js"></script>

引入pokemon.js [pokemon.js , pokemon.min.js]
<script src="./dist/pokemon.min.js"></script>
```

# 参数

```
var pokemon = new Pokemon(id,[options]);

[options]
- pixel  像素大小
  type Number
  default 1
```

# 实例方法

- go() (return: [object HTMLCanvasElement])
- getId() (return: Number)
- getName(lang) [lang: 'en' / 'zh', default: 'en'] (return: String)
- setId(id)

# 使用

```
var pokemon = new Pokemon(1);

返回一个canvas [object HTMLCanvasElement]
pokemon.go();

获取id
pokemon.getId();

获取英文/中文名称
pokemon.getName();

设置id
pokemon.setId(2);

```