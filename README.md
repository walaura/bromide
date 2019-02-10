# bromide

View and compare differences between two sets of images in a generated static site. It'll group changes by how changed they are and allow you to quickly view each set individually, side by side, or as a diff map between both images.

**This tool is meant to be used as part of a larger visual regression toolchain, so you'll still need something that actually takes screenshots & compares them.** <a href="https://github.com/walaura/bromide/tree/master/projects/bromide-differ">Check out `bromide-differ`</a> if you want a straightforward differ that generates the expected output right out of the box.

<img width="1270" alt="screenshot 2019-02-10 at 2 54 34 pm" src="https://user-images.githubusercontent.com/11539094/52535274-17b0ce80-2d44-11e9-980a-80d688ee19d6.png">
<img width="1270" alt="screenshot 2019-02-10 at 2 54 40 pm" src="https://user-images.githubusercontent.com/11539094/52535276-1bdcec00-2d44-11e9-97a3-ddfae1a2e519.png">

## How to use

Let's say you have this json, it's a list of image urls (original, current, diff), a friendly name for each, and the difference between them as a %. It looks like this:

```json
📄 /screenies.json
[
  {
    "srcset": {
      "original": "https://i.imgur.com/do79zD3.jpg",
      "current": "https://i.imgur.com/6INW6uB.jpg",
      "diff": "https://i.imgur.com/6INW6uB.jpg"
    },
    "name": "Landing page",
    "difference": 0.862
  },
  {
    "srcset": {
      "original": "https://i.imgur.com/j0aYNKq.png",
      "current": "https://i.imgur.com/ZXmcL9U.png",
      "diff": "https://i.imgur.com/6INW6uB.jpg"
    },
    "name": "User profile menu",
    "difference": 0.9
  }
]
```

Just run

```
$ npx bromide --changes screenies.json --out site
```

...and if it all worked out, you should have a static site in your `/site` folder where you can compare your images neatly! You can see it locally by running `npx serve ./out`. The original images get downloaded alongside the site to make it self contained.

There's not much use for this locally as you could just, like, open the files, but imagine if you then move that site to an S3 bucket and make it a post deploy hook. Magic!

## bonus! customizing the change list

`bromide` takes an approach of embracing change. Instead of calling out visual regressions, it _celebrates_ changes, it just puts them in front of you so you can check if they are desired.

Your project might have different requeriments, and that's okay! You can pass a third `--thresholds` parameter with the path to a json of change groups you want the UI to display:

```json
📄 /thresholds.json
{
  "colors": [
    [138, 87, 78],
    [216, 87, 78],
    [331, 88, 80]
  ],
  "thresholds": [
    {
      "from": 0.75,
      "singular": "has visual regressions",
      "plural": "have visual regressions"
    },
    {
      "from": 0.25,
      "singular": "may have visual regressions",
      "plural": "may have visual regressions"
    },
    {
      "from": 0,
      "singular": "looks the same",
      "plural": "look the same"
    }
  ]
}
```

The colors are an extra bit of eye candy for the threshold titles, don't worry about having the same number of colours as you have thresholds! The app will make a gradient blend for each step. If you hate joy you can not pass any colours in and everything will be grey.

```
$ npx bromide --changes screenies.json --thresholds thresholds.json --out site
```
