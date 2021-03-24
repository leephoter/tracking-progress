import React, { PureComponent } from "react";
import "./Graph.css";
// import Table from "../../component/table/table.json";
// import { Route } from "react-router-dom";
// import { matchPath } from "react-router";
import Table from "../../component/table/Table.json";
import dummy1 from "../../component/table/dummy1.json";
import dummy2 from "../../component/table/dummy2.json";
import dummy3 from "../../component/table/dummyTestData.json";

class Graph extends PureComponent {
    state = {
        count: [], //수업 수
        name: [], //수업이름
        firstName: [], //수업이름앞글자
        attendanceWeek1: [], //총 16개 (주차 출석)
        attendanceWeek2: [],
        attendance1: [], //수업1의 출석 전체[["O", "X", "X"],["X", "X", "X"],["", "", ""], ...]
        attendance2: [], //수업2의 출석 전체
        lastAttendance1: [], //출석에 맞는 id값
        lastAttendance2: [],
        class1: [], //들어야하는 주차 목록
        class2: [],
        graphCount: [0, 1, 2, 3, 4, 5, 6], //과목수 7
        status: [], //16주차를 해야됨

        //
        // 한 수업당: 주차별출석현황O, 수업별X, 교시별출석(progress[주차][attendance1]),
    };

    componentDidMount() {
        const { getName, getAttendance } = this;
        getName();
        getAttendance();
    }

    getName = () => {
        // 수업명 가져오기
        const { name } = this.state;
        const _name = Array.from(name);
        for (var i = 0; i < 2; i++) {
            _name.push(dummy1[i].course.name);
        }
        this.setState({
            name: _name,
        });
        // this.getFirstName(_name);
    };

    // getFirstName = (_name) => {
    //     let _firstName = _name.map();
    //     console.log("_name :>> ", _firstName);
    //     this.setState({
    //         firstName: _firstName,
    //     });
    // };

    getAttendance = () => {
        //수업 2개가 각각 몇주차까지 있나
        const { status } = this.state;
        const _status1 = dummy1[0].progress.map((item, index) => {
            return index;
        });
        const _status2 = dummy1[1].progress.map((item, index) => {
            return index;
        });
        const _attendance1 = _status1.map((each, index) => {
            return dummy1[0].progress[index].map((item) => item.attendance);
        });
        const _attendance2 = _status2.map((each, index) => {
            return dummy1[1].progress[index].map((item) => item.attendance);
        });
        //수업1,수업2의 각각의 출석 전체 현황 attendance
        this.setState({
            status1: _status1,
            attendance1: _attendance1,
            attendance2: _attendance2,
        });

        const _attendanceWeek1 = _status1.map((each, index) => {
            return dummy1[0].progress[index][0].attendanceWeek;
        });
        const _attendanceWeek2 = _status2.map((each, index) => {
            return dummy1[1].progress[index][0].attendanceWeek;
        });
        //수업1,수업2의 각각의 주차별 출석현황
        this.setState({
            // attendance:
            attendanceWeek1: _attendanceWeek1,
            attendanceWeek2: _attendanceWeek2,
        });
        this.judgeAttendance(_attendanceWeek1, _attendanceWeek2);
        // this.takeClass(_attendance, _attendanceWeek);
    };

    judgeAttendance = (_attendanceWeek1, _attendanceWeek2) => {
        //출석 판별 후 id값 대입
        const _lastAttendance1 = _attendanceWeek1.map((each, index) => {
            if (each === "O") {
                return "attendance";
            } else {
                return "absence";
            }
        });
        const _lastAttendance2 = _attendanceWeek2.map((each, index) => {
            if (each === "O") {
                return "attendance";
            } else {
                return "absence";
            }
        });
        console.log("_lastAttendance1 :>> ", _lastAttendance2);

        this.setState({
            lastAttendance1: _lastAttendance1,
            lastAttendance2: _lastAttendance2,
        });
    };

    takeClass = (_attendance, _attendanceWeek) => {
        //몇교시부터 들어야 하는가
        const _class = _attendance.map((item1, index1) => {
            return item1.map((item2, index2) => {
                if (item2 === "O") {
                    return null;
                } else {
                    return index1 + 1;
                }
            });
        });
        const __class = Array.from(_class);
        __class.map((item, index) => {
            item.sort();
        });
        const ___class = __class.map((item, index) => {
            return item[0];
        });
        //안 들은 수업이 있는 주차 배열
        //attendance배열의 item을 map비교해서 "X"가 있나없나, 있으면 index+1, 없으면 null ->> sort() ->>
        this.setState({
            class1: ___class,
        });
        //안들은 수업들이 몇주차인지 class1에 배열로 저장
    };

    render() {
        const {
            name,
            firstName,
            class1,
            attendance1,
            attendance2,
            attendanceWeek,
            lastAttendance1,
            lastAttendance2,
            graphCount,
            status,
        } = this.state;
        // console.log("name :>> ", name);
        // console.log("attendance1 :>> ", attendance1);
        // console.log("attendance2 :>> ", attendance2);
        // console.log("status :>> ", status);
        // console.log("attendanceWeek :>> ", attendanceWeek);
        // console.log(attendance1[attendanceWeek.indexOf("X")]);
        // console.log(
        //     "몇교시수업부터 들어야 되는가 :>> ",
        //     attendance1[attendanceWeek.indexOf("X")]
        // );
        // console.log("몇교시부터 들어야되냐? :>> ", class1);
        // console.log("dummy1[0].progress :>> ", dummy1[0].progress);
        return (
            <div className="graghWhole">
                <div className="gragh">
                    {/* {graphCount.map((item) => (
                        <div id={lastAttendance1[item]}></div>
                    ))} */}
                    <div id={lastAttendance1[0]}></div>
                    <div id={lastAttendance2[0]}></div>
                </div>
                <div className="color">
                    {/* {graphCount.map((item) => ( */}
                    <span>{firstName[0]}</span>
                    {/* ))} */}
                </div>
            </div>
        );
    }
}

export default Graph;
