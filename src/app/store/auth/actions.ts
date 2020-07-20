import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export enum ActionTypes {
    GetAuthState = '[Auth] Get auth state',

    GettingAuthState = '[Auth] Getting auth state',
    Authenticated = '[Auth] Authenticated',
    NotAuthenticated = '[Auth] Not authenticated',
    GetAuthStateFailed = '[Auth] Get auth state failed',

    Login = '[Auth] Login',

    LoginRequested = '[Auth] Loging in',
    LoginSucceeded = '[Auth] Login succeeded',
    LoginFailed = '[Auth] Login failed',

    Logout = '[Auth] Logout',

    LogoutRequested = '[Auth] Loging out',
    LogoutSucceeded = '[Auth] Logout Succeeded',
    LogoutFailed = '[Auth] Logout Failed',
}

// Get User AuthState
export class GetAuthState implements Action {
    readonly type = ActionTypes.GetAuthState;
}
export class GettingAuthState implements Action {
    readonly type = ActionTypes.GettingAuthState;
}
export class Authenticated implements Action {
    readonly type = ActionTypes.Authenticated;
    constructor(public payload: User) { }
}

export class NotAuthenticated implements Action {
    readonly type = ActionTypes.NotAuthenticated;
}

export class GetAuthStateFailed implements Action {
    readonly type = ActionTypes.GetAuthStateFailed;
    constructor(public payload: { error: any }) { }
}

/// Login Actions

export class Login implements Action {
    readonly type = ActionTypes.Login;
    constructor(public payload: { username: string, password: string }) { }
}
export class LoginRequested implements Action {
    readonly type = ActionTypes.LoginRequested;
    constructor(public payload: { username: string, password: string }) { }
}
export class LoginSucceeded implements Action {
    readonly type = ActionTypes.LoginSucceeded;
}
export class LoginFailed implements Action {
    readonly type = ActionTypes.LoginFailed;
    constructor(public payload: { error: any }) { }
}

/// Logout Actions

export class Logout implements Action {
    readonly type = ActionTypes.Logout;
}
export class LogoutRequested implements Action {
    readonly type = ActionTypes.LogoutRequested;
}
export class LogoutSucceeded implements Action {
    readonly type = ActionTypes.LogoutSucceeded;
}
export class LogoutFailed implements Action {
    readonly type = ActionTypes.LogoutFailed;
    constructor(public payload: { error: any }) { }
}

export type AuthActions
    =
    GetAuthState |

    GettingAuthState |
    Authenticated |
    NotAuthenticated |
    GetAuthStateFailed |

    Login |

    LoginRequested |
    LoginSucceeded |
    LoginFailed |

    Logout |

    LogoutRequested |
    LogoutSucceeded |
    LogoutFailed 