import React, { Component } from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import Map from "../Map/Map";
import GetIdActions from '../../actions/GetIdActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import "flat-ui/css/flat-ui.css";
import "./UserId.css";

/**
 * User Id
 */

class UsersId extends Component {
    constructor(props) {
        super(props);

        this.updateUserDescription = this.updateUserDescription.bind(this);
        this.updateUserImg = this.updateUserImg.bind(this);
        this.updateImgUrl = this.updateImgUrl.bind(this);
    }

    /*** проверка авторизации и редирект */
    componentWillMount(){
        const auth = this.props.auth;
        if (!auth) {
            this.props.history.replace('/auth')
        }
    }

    /*** обновить описание */
    updateUserDescription() {
        const {value: description} = this.refs.description;
        GetIdActions.changeDescription(description);
    }

    /*** обновить фото*/
    updateUserImg(event) {
        const {image} = this;
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        image.title = selectedFile.name;

        reader.onload = event => {
            image.src = event.target.result;
            GetIdActions.changeUserImg(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
        this.imgUrl.value = null; //очистить поле для ссылки
    }

    /*** обновить фото по url*/
    updateImgUrl(event){
        const {image} = this;
        const imgLink = event.target.value;
        image.src = imgLink;
        GetIdActions.changeUserImg(imgLink);
    }

    render() {
        const {user} = this.props;
        return (
            <div className="user-page">
                <div className="row">
                    <div className="col-4 info-block">
                        <div className="user-pic">
                            <img height="200" width="auto" alt="userpic"
                                 ref={value => this.image = value}
                                 src={user.localInfo.image}
                            />
                        </div>
                        <div className="file_upload">
                            <button type="button">Change</button>
                            <div>{user.localInfo.image ? "loaded" : "No file"}</div>
                            <input type="file" onChange={this.updateUserImg}/>
                        </div>
                        <input type="text" placeholder='add img link' className="by-link"
                               ref={el => this.imgUrl = el}
                               onChange={this.updateImgUrl}
                        />
                        <div className="user-info">
                            <input type="text" value={user.userInfo.id} disabled="disabled" className="form-control"/>
                            <input type="text" value={user.userInfo.firstName} disabled="disabled" className="form-control"/>
                            <input type="text" value={user.userInfo.lastName} disabled="disabled" className="form-control"/>
                            <input type="text" value={user.userInfo.email} disabled="disabled" className="form-control"/>
                        </div>
                    </div>

                    <div className="col-8 description-block">
                        <div className="user-description">
                            <textarea ref="description" defaultValue={user.localInfo.description}/>
                            <div className="change_btn" onClick={this.updateUserDescription}>
                                <span className="btn btn-block btn-lg btn-primary">
                                    <span className="fui-new"/> Change</span>
                            </div>
                        </div>
                        <div id="map">
                            <Map location={user.userInfo.location}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.userId,
        auth: state.auth.auth
    }}

export default connect(mapStateToProps)(withRouter(UsersId));
