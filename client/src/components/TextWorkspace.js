import React, { Component } from 'react'

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class TextEditWorkspace extends Component {
    render() {
        const styles = {
            container: {
                color: this.props.logo.color,
                position: "absolute",
                fontSize: this.props.logo.fontSize + "pt",
                margin: this.props.logo.margin + "px",
                padding: this.props.logo.padding + "px",
                backgroundColor: this.props.logo.backgroundColor,
                borderStyle: "solid",
                borderColor: this.props.logo.borderColor,
                borderRadius: this.props.logo.borderRadius+"px",
                borderWidth: this.props.logo.borderThickness+"px",
            }
        }
        //we can abuse the fact that this.props.logo is updated by text
        return (
            <div
                style={styles.container}>
                <span>{this.props.logo.text.replace(/ /g, '\u00a0')}
                </span>
            </div>
        )
    }
}

export default TextEditWorkspace