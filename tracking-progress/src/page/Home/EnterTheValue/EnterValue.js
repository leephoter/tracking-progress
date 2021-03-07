import React, { Component } from "react";
import "../Login/Login.css";

class EnterValue extends Component {
    render() {
        const { step, explain, inputValue, value, enterKey } = this.props;
        return (
            <div className="whole">
                <div className="Tracking-Progress">
                    <div className="text">Tracking Progress</div>
                </div>
                <div className="Step">
                    <div className="explain">
                        <div>{step}</div>
                        <span>{explain}</span>
                    </div>
                    <div className="inputBox">
                        <div className="moodle">MoodleSesstion</div>
                        <div className="input">
                            <input
                                type="text"
                                id="inputValue"
                                placeholder="MoodleSession을 입력해주세요"
                                onChange={inputValue}
                                onKeyPress={enterKey}
                            ></input>
                            <button
                                onClick={function (e) {
                                    // inputValue();
                                    value();
                                }}
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EnterValue;
