import React from 'react'
import { useState } from 'react'
import Map from '../../components/Map/Map'
import apiService from '../../services/apiService'
import Loader from "react-js-loader";
import PostSetting from './PostSetting';
import { useDispatch, useSelector } from 'react-redux'

const CreateLocation = () => {
  const { data } = JSON.parse(localStorage.getItem("user"))
  const latitude = parseFloat(data.user.latitude);
  const longitude = parseFloat(data.user.longitude)
  const [lat, setLat] = useState(latitude)
  const [lng, setLng] = useState(longitude)
  const [loading, setIsLoaded] = useState(0)

  const { mention_users } = useSelector((state) => ({ ...state.search }))
  const { tag_users } = useSelector((state) => ({ ...state.search }))
  const { isPublicPost } = useSelector((state) => ({ ...state.setting }))
  const { isCommentTurnOff } = useSelector((state) => ({ ...state.setting }))
  const { location } = useSelector((state) => ({ ...state.post }))

  const createPost = () => {
    let tag_user_ids = []
    let mentions = []
    let tagged_user_ids = null
    if (tag_users) {
      tag_users.forEach(element => {
        console.log(element);
        tag_user_ids.push(element.id);
      });
      tagged_user_ids = Object.values(tag_user_ids).join(',');
    }
    if (mention_users) {
      console.log("dsff");
      mention_users.forEach(element => {
        var data = { id: element.id, name: element.first_name + " " + element.last_name, accountId: element.account_id }
        console.log(data);
        mentions.push(data);
      });
    }
    console.log(mentions);

    const data = {
      type: "location",
      latitude: lat,
      longitude: lng,
      location: location,
      is_public: isPublicPost,
      user_tags: tagged_user_ids,
      mention: JSON.stringify(mentions),
      turn_off_comment: isCommentTurnOff

    }
    console.log(data);
    apiService.CreatePost(data).then((res) => {
      if (res.success === 1) {
        console.log(res.data);
        // window.location.reload()
        setIsLoaded(1)
      } else {
        setIsLoaded(1)
      }
    })
  }
  return (
    <>
      <h2 className="modal-title text-center mb-4">Create Location</h2>
      {/* <h3 className="modal-title">Search for location</h3> */}
      <div >
        {loading ?
          <Loader type="bubble-top" bgColor={"#619cb0"} color={'transparant'} size={30} />
          : <></>
        }
      </div>

      {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d119066.52982230402!2d72.82229625000001!3d21.15920015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1629171580492!5m2!1sen!2sin"
            width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe> */}
      <Map
        // google={this.props.google}
        {...{ lat, setLat, lng, setLng }}
      />
      <div className="modal-footer mt-10">
        <PostSetting />
        <button type="button" className="btn btn-primary button-effect btn-sm" data-dismiss="modal" onClick={createPost}>Post</button>
      </div>
    </>
  )
}

export default CreateLocation