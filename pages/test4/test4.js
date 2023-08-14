let utils = require("../../utils/util")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        meetingdate: utils.formatTime(new Date()),
        // meetingdate:"2023-08-10",
        meetingtime: '上午',
        timerange: ['上午','下午','晚上'],
        meetingtype: '会议室',
        listbtn: [
            {
                id: 1,
                name: '会议室A',
                // 0:可以预定  1:选中  2:已经预定
                status: 0
            },
            {
                id: 2,
                name: '会议室B',
                // 0:可以预定  1:选中  2:已经预定
                status: 2
            },
            {
                id: 3,
                name: '会议室C',
                // 0:可以预定  1:选中  2:已经预定
                status: 0
            },{
                id: 4,
                name: '会议室D',
                // 0:可以预定  1:选中  2:已经预定
                status: 0
            },{
                id: 5,
                name: '会议室E',
                // 0:可以预定  1:选中  2:已经预定
                status: 0
            },{
                id: 6,
                name: '会议室F',
                // 0:可以预定  1:选中  2:已经预定
                status: 0
            }
        ]
    },
    chooseroom(ev) {
        let room = ev.currentTarget.dataset.room;
        if (2 == room.status) {
            return;
        }
        this.setData({
            listbtn: this.data.listbtn.map(item => {
                if (item.id == room.id) {
                    return {...room, status: 1};
                } else {
                    if (2 == item.status) {
                        return item;
                    } else {
                        return {...item, status: 0};
                    }
                    
                }
            })
        });
        
    },
    changetype(ev) {
        console.log(333, ev)
        this.setData({
            meetingtype: ev.detail.value
        })
    },
    dosubmit(ev) {
        console.log("ev", ev);
    },
    onLoad() {
    },
    changedate(ev) {
        console.log(111, ev);
        this.setData({
            meetingdate: ev.detail.value
        })
    },
    changetime(ev) {
        console.log(ev, 222)
        let val = this.data.timerange[Number(ev.detail.value)];
        this.setData({
            meetingtime: val
        })
    }

})