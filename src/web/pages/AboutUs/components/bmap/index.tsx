import * as React from "react";

const BJmap: React.FC = () => {

    let Mp = (ak: string) => {
        return new Promise(function (resolve, reject) {
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `http://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=init`;
            document.head.appendChild(script);
            (window as any).init = () => {
                resolve((window as any).BMapGL)
            }
        })
    }
    React.useEffect(()=>{
        Mp("PAZGg1jfimrTHCIAsoQc9zfsRbh").then(BMapGL => {
            // let map = new BMapGL.Map('allmap');
            // map.centerAndZoom(new BMapGL.Point(116.320569, 40.072627), 19);         // 创建Map实例
            let map = new BMapGL.Map('allmap');
            map.centerAndZoom(new BMapGL.Point(116.320569, 40.072627), 19);         // 创建Map实例
            map.enableScrollWheelZoom(true);
            map.setHeading(64.5);
            map.setTilt(73);                 //启用滚轮放大缩小
        });
    },[])
    return (
        <div style={{padding:'24px'}}>
            <div id='allmap' style={{ width: 1024, height: 600 }}></div>
        </div>
    )
}

export default BJmap
