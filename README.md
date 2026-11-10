# Singing Jam

Singing Jam is a responsive, vanilla JavaScript acoustic jam session app. Firebase Authentication and Cloud Firestore provide anonymous identity, room membership, and real-time updates.

## Run locally

Serve this folder over HTTP (ES modules do not work from `file://`), for example with `npx serve .` or VS Code Live Server.

1. Create a Firebase project and enable **Anonymous** sign-in.
2. Create a Firestore database.
3. Copy the web app settings into `js/firebase/config.js`.
4. Deploy `firebase/firestore.rules` with the Firebase CLI: `firebase deploy --only firestore:rules`.
5. Add your local and GitHub Pages domains to Firebase Authentication's authorized domains.

The QR code uses the hosted QRCode.js library. Firebase configuration is intentionally a placeholder and must not contain Admin SDK credentials.

## GitHub Pages

The app uses relative URLs and works from repository subpaths. Publish the repository root with GitHub Pages. Firebase must authorize `USERNAME.github.io` and the repository's deployment URL. Open `tv.html?room=ROOMCODE` on a Smart TV for the read-only synced display.

## Scope and next integrations

Manual song requests and optional pasted lyrics are supported without a protected-content provider. An authorized lyrics/chords adapter can be added under `js/services/`; the app does not scrape or embed unauthorized sources. Google Cast requires a registered sender/receiver application and is intentionally not enabled without those credentials.
