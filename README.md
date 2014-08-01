# dajaxTaB.js

DobleD Ajax Tab for Bootstrap 3.0

## Required

- jquery >=1.8.3
- underscore >= 1.5.2

## In the Browser

Usage:

```html
<script type="text/javascript" src="dajaxTaB.js"></script>
```

## Quick Examples

```javascript
var json = {
    tabs: [
        {
            'id'   : 'idTab1',
            'url'  : '/url/tab/1',
            'title': 'Title Tab 1'
        },
        {
            'id'   : 'idTab2',
            'url'  : '/url/tab/2',
            'title': 'Title Tab 2'
        }
    ]
};

$('selector').dajaxTaB(
    json
);
```