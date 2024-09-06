// BigBlueButton open source conferencing system - http://www.bigbluebutton.org/.
//
// Copyright (c) 2022 BigBlueButton Inc. and by respective authors (see below).
//
// This program is free software; you can redistribute it and/or modify it under the
// terms of the GNU Lesser General Public License as published by the Free Software
// Foundation; either version 3.0 of the License, or (at your option) any later
// version.
//
// Greenlight is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License along
// with Greenlight; if not, see <http://www.gnu.org/licenses/>.

import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SigninForm from './forms/SigninForm';
import Logo from '../../shared_components/Logo';
import useSiteSetting from '../../../hooks/queries/site_settings/useSiteSetting';
import useEnv from '../../../hooks/queries/env/useEnv';

export default function SignIn() {
  const { t } = useTranslation();
  const { data: registrationMethod } = useSiteSetting('RegistrationMethod');
  const { data: env } = useEnv();

  useEffect(() => {
    // Apply the background image if SET_BG_IMAGE is true and BG_IMAGE_PATH is provided
    if (env?.SET_BG_IMAGE === 'true' && env?.BG_IMAGE_PATH) {
      document.body.style.backgroundImage = `url(${env.BG_IMAGE_PATH})`;
      document.body.style.backgroundSize = 'cover';
    } else {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = 'var(--brand-color)';
    }

    return () => {
      // Clean up the style when the component unmounts or the effect is rerun
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundColor = '';
    };
  }, [env?.SET_BG_IMAGE, env?.BG_IMAGE_PATH]);

  return (
    <div className="vertical-center">
      {/* <div className="text-center pb-4">
        <Logo />
      </div> */}
      <Card className="col-xl-5 col-lg-6 col-md-8 col-10 custom-signin">
        {/* <Card.Title className="text-center pb-2"> { t('authentication.sign_in') } </Card.Title> */}
        <div className="text-center pb-4">
          <Logo className="custom-logo"/>
        </div>
        <SigninForm />
        { registrationMethod !== 'invite' && (
        <span className="text-center text-muted small"> { t('authentication.dont_have_account') }
          <Link to="/signup" className="text-link"> { t('authentication.sign_up') } </Link>
        </span>
        )}
      </Card>
    </div>
  );
}
