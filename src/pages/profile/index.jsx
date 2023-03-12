import React from "react";
import { ContainerAdmin, ContainerFluid, Headers, Row } from "../../common";
import AccountDetails from "../../components/profile/accountDetails";
import ProfilePicture from "../../components/profile/profilePicture";
import { getUser } from "../../utils/localStorage";

const profile = () => {
  const user = getUser();
  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="profile" />
        <Row>
          <ProfilePicture picture={user.picture} />
          <AccountDetails user={user} />
        </Row>
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default profile;
