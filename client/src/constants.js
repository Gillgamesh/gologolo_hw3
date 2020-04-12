export const DEFAULT_LOGO = {
    text: "fortnit2e",
    color:"#000fff",
    borderColor: "#000080",
    backgroundColor: "#007000",
    borderRadius: 34,
    borderThickness: 34,
    fontSize: 20,
    padding: 100,
    margin: 100,
}

export const FIELDS = [
    {
        label: "Text",
        name: "text",
        type: "text"
    },
    {
        label: "Text Color",
        name: "color",
        type: "color"
    },
    {
        label: "Border Color",
        name: "borderColor",
        type: "color"
    },
    {
        label: "Background Color",
        name: "backgroundColor",
        type: "color"
    },
    {
        label: "Font Size",
        name: "fontSize",
        type: "number",
        min: 2,
        max: 100
    },
    {
        label: "Border Radius",
        name: "borderRadius",
        type: "number",
        max: 200
    },
    {
        label: "Border Thickness",
        name: "borderThickness",
        type: "number",
        max: 200
    },
    {
        label: "Margin",
        name: "margin",
        type: "number"
    },
    {
        label: "Padding",
        name: "padding",
        type: "number"
    },
]