import { takeLatest, put, all, call } from "typed-redux-saga/macro"

import { USER_ACTION_TYPES } from "./user.types"
import { User } from "firebase/auth"
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
} from "./user.action"

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation,
} from "../../utils/firebase/firebase.utils"

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    )
    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    }
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* signInwithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    )

    if (userCredential) {
      const { user } = userCredential
      yield* call(getSnapshotFromUserAuth, user)
    }
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    )

    if (userCredential) {
      const { user } = userCredential
      yield* put(signUpSuccess(user, { displayName }))
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error))
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser)
    yield* put(signOutSuccess())
  } catch (error) {
    yield* put(signOutFailed(error as Error))
  }
}

export function* signInAfterSignup({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails)
}

export function* signInwithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup)
    yield* call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser)
    if (!userAuth) return

    yield* call(getSnapshotFromUserAuth, userAuth)
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInwithEmail)
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInwithGoogle)
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignup)
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ])
}
