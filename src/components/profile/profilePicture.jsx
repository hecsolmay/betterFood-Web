import React from "react";

const ProfilePicture = ({picture}) => {
  return (
    <div className="col-xl-4">
      {/* <!-- Profile picture card--> */}
      <div className="card mb-4 mb-xl-0">
        <div className="card-header">Foto de Perfil</div>
        <div className="card-body text-center">
          {/* <!-- Profile picture image--> */}
          <img
            className="img-account-profile rounded-circle mb-2"
            src={picture ? picture : "img/undraw_profile.svg"}
            alt=""
          />
          {/* <!-- Profile picture help block--> */}
          <div className="small font-italic text-muted mb-4">
            JPG o PNG no mas grande de 5 MB
          </div>
          {/* <!-- Profile picture upload button--> */}
          <button className="btn btn-primary" type="button">
            Subir nueva imagen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
