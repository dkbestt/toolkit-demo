import React, { useEffect, useState } from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { MAP_KEY } from '../../constants/Contants';
import { useDispatch, useSelector } from 'react-redux'
import { resetLocation, setLocation } from '../../store/reducers/postSlice';

Geocode.setApiKey(MAP_KEY);
Geocode.enableDebug();

const Map = ({lat,setLat,lng,setLng}) => {
    const {location}  = useSelector((state) => ({ ...state.post }))
    const dispatch = useDispatch()
    const onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        console.log(newLat, newLng, ";;;;;;;;;;;;;;");
        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const location_address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components
                //   city = getCity( addressArray ),
                //   area = getArea( addressArray ),
                //   state = getState( addressArray );
                // setState( {
                // 	address: ( address ) ? address : '',
                // 	area: ( area ) ? area : '',
                // 	city: ( city ) ? city : '',
                // 	state: ( state ) ? state : '',
                // 	markerPosition: {
                // 		lat: newLat,
                // 		lng: newLng
                // 	},
                // 	mapPosition: {
                // 		lat: newLat,
                // 		lng: newLng
                // 	},
                // } )
                setLat(newLat)
                setLng(newLng)
                dispatch(setLocation(location_address))
               
            },
            error => {
                console.error(error);
            }
        );
    };
    const handleMakerclick = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();
        console.log(newLat, newLng, "=============");
        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const location_address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components
                setLat(newLat)
                setLng(newLng)
                  dispatch(setLocation(location_address))
            },
            error => {
                console.error(error);
            }
        );
    }
    const onPlaceSelected = (place) => {
        console.log('plc', place);
        const location_address = place.formatted_address,
            addressArray = place.address_components,
            //   city = this.getCity( addressArray ),
            //   area = this.getArea( addressArray ),
            //   state = this.getState( addressArray ),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
        // Set these values in the state.
        // this.setState({
        // 	address: ( address ) ? address : '',
        // 	area: ( area ) ? area : '',
        // 	city: ( city ) ? city : '',
        // 	state: ( state ) ? state : '',
        // 	markerPosition: {
        // 		lat: latValue,
        // 		lng: lngValue
        // 	},
        // 	mapPosition: {
        // 		lat: latValue,
        // 		lng: lngValue
        // 	},
        // })
        setLat(latValue)
        setLng(lngValue)
          dispatch(setLocation(location_address))
        console.log(latValue);
        console.log(lngValue);
    };
    const onInfoWindowClose = (event) => {

    };
    const handleMapClick=(event)=>{
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();
            setLat(newLat)
            setLng(newLng)
            Geocode.fromLatLng(newLat, newLng).then(
                response => {
                    const location_address = response.results[0].formatted_address,
                        addressArray = response.results[0].address_components
                      dispatch(setLocation(location_address))
                },
                error => {
                    console.error(error);
                }
            )
    }
    useEffect(() => {
        Geocode.fromLatLng(lat, lng).then(
            response => {
                const location_address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components
                // city = this.getCity(addressArray),
                // area = this.getArea(addressArray),
                // state = this.getState(addressArray);

                // console.log('city', city, area, state);

                // this.setState({
                //     address: (address) ? address : '',
                //     area: (area) ? area : '',
                //     city: (city) ? city : '',
                //     state: (state) ? state : '',
                // })
                  dispatch(setLocation(location_address))
            },
            error => {
                console.error(error);
            }
        );
    }, []);
    const AsyncMap = withScriptjs(
        withGoogleMap(
            props => (
                <GoogleMap
                    // oogle={props.google}
                    defaultZoom={15}
                    defaultCenter={{ lat: lat, lng: lng }}
                    // onClick={handleMapClick}
                >
                    {/* InfoWindow on top of marker */}
                    <InfoWindow
                        onClose={onInfoWindowClose}
                        position={{ lat: (lat + 0.0018), lng: lng }}
                    >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>{location}</span>
                        </div>
                    </InfoWindow>
                    {/*Marker*/}
                    <Marker 
                    // google={props.google}
                        name={'Dolores park'}
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                        position={{ lat: lat, lng: lng }}
                        onClick={handleMakerclick}
                    />
                    <Marker />
                    {/* For Auto complete Search Box */}
                    {/* <Autocomplete
                        style={{
                            width: '100%',
                            height: '40px',
                            paddingLeft: '16px',
                            marginTop: '2px',

                        }}
                        onPlaceSelected={onPlaceSelected}
                        types={['(regions)']}
                    /> */}
                    <Autocomplete
                     apiKey={MAP_KEY}
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px',
								marginBottom: '500px'
							}}
							onPlaceSelected={ onPlaceSelected }
							types={['(regions)']}
						/>
                </GoogleMap>
            )
        )
    );
    return (
        <div>
            <AsyncMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&libraries=places`}
                loadingElement={
                    <div style={{ height: `100%` }} />
                }
                containerElement={
                    <div style={{ height: `300px` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
            />
        </div>
    )
}

export default Map