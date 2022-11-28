import Base from '../api/base';
import {IEBayApiRequest} from '../request';
import {AppConfig} from '../types';
import OAuth2 from './oAuth2';

/**
 * Container with Auth'N'Auth and OAuth2.
 */
export default class Auth extends Base {
  public readonly oAuth2: OAuth2;
  public readonly OAuth2: OAuth2;

  constructor(config: AppConfig, req: IEBayApiRequest) {
    super(config, req);
    this.OAuth2 = new OAuth2(this.config, this.req);
    this.oAuth2 = this.OAuth2;
  }

  public async getHeaderAuthorization(useIaf: boolean) {
    const accessToken = await this.OAuth2.getAccessToken();
    return {
      Authorization: (useIaf ? 'IAF ' : 'Bearer ') + accessToken
    }
  }
}
