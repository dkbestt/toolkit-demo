import React, { useEffect, useState } from 'react'
import apiService from '../../services/apiService'

const DeviceList = () => {
    const [list, setList] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        apiService.LoginDeviceList().then((res) => {
            setLoading(false)
            console.log(res)
            setList(res.data)
        })
    }, [])
    const handleLogoutOtherDevice = (data) => {
        console.log(data.id);
        // setList.filter(({ id }) => id !== id)
        setList(list.filter(({ id }) => id !== data.id));
    }
    return (
        <div>
            {loading ? (
                <h3 style={{ textAlign: "center" }}> <strong>Loading...</strong> </h3>
            ) : (
                <>
                    <h3 style={{ textAlign: "center" }}> <strong>Device List</strong> </h3>
                    <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
                        {
                            list && list.map((loginList, index) => (
                                <div className="panel panel-default" key={index}>
                                    <h4 className="panel-title" >
                                        {loginList.device_type}
                                    </h4>
                                    <span className="ios-toggle" onClick={() => handleLogoutOtherDevice(loginList)}>
                                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default DeviceList
