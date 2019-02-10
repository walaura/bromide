# bromide

View and compare differences between two sets of images in a generated static site. It'll group changes by how changed they are and allow you to quickly view each set individually, side by side, or as a diff map between both images.

_This tool is meant to be used as part of a larger visual regression toolchain, so you'll still need something that actually takes screenshots & compares them._

<img width="1477" alt="screenshot 2019-02-10 at 9 00 01 am" src="https://user-images.githubusercontent.com/11539094/52531777-a1e03f00-2d12-11e9-926b-1130a1a4395e.png">

## how to use

Let's say you have this json, it's a list of image urls, a friendly name for each, and the difference between them. It looks like this:

```json
📄 /screenies.json
[
  {
    "srcset": {
      "original": "https://i.imgur.com/do79zD3.jpg",
      "current": "https://i.imgur.com/6INW6uB.jpg"
    },
    "name": "Landing page",
    "diff": 0.862
  },
  {
    "srcset": {
      "original": "https://i.imgur.com/j0aYNKq.png",
      "current": "https://i.imgur.com/ZXmcL9U.png"
    },
    "name": "User profile menu",
    "diff": 0.9
  }
]
```

It's a simple pretty unopinionated data shape. Now, the same can't be said of all the possible ways to generate it, that's why `bromide` only concerns itself with letting you visualize the changes, while delagating the heavy lifting to any toolkit of your choice.

In the same directory, you can run:

```
$ npx bromide --changes screenies.json --out site
```

...and if it all worked out, you should have a static site in your `/site` folder where you can compare your set of differences neatly! You can see it locally by running `npx serve ./out`.

There's not much use for this locally as you could just, like, open the files, but imagine if you then move that site to an S3 bucket and make it a post deploy hook. Magic!

## bonus! customizing the change list

`bromide` takes an approach of embracing change. Instead of calling out visual regressions, it _celebrates_ changes, it just puts them in front of you so you can check if they are desired.

Your project might have different requeriments, and that's okay! You can pass a third `--thresholds` parameter with the path to a json of change groups you want the UI to display:

```json
📄 /thresholds.json
[
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
```

```
$ npx bromide --changes screenies.json --thresholds thresholds.json --out site
```
