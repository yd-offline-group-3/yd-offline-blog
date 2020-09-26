import * as React from "react";

declare global {
    interface Window { 
        init():void
        BMapGL():void
     }
}


const BJmap: React.FC = ():JSX.Element => {

    let Mp = (ak: string) => {
        return new Promise(function (resolve, reject) {
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `http://api.map.baidu.com/api?type=webgl&v=2.0&ak=${ak}&callback=init`;
            document.head.appendChild(script);
            window.init = () => {
                resolve(window.BMapGL)
            }
        })
    }
    React.useEffect(()=>{
        Mp("cajNyShk81OyY4NlzfKNP94KW7luy9tH").then(BMapGL => {
            let map = new (BMapGL as any).Map('allmap');
            map.centerAndZoom(new (BMapGL as any).Point(116.320569, 40.072627), 19);         // 创建Map实例
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
