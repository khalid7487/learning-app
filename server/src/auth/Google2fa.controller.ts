import {Request, Response, Router} from "express";
import QRCode from "qrcode";
import Speakeasy from "speakeasy"
import fs from 'fs';

const router = Router()

// Time-based One-Time Password (TOTP)

router.get('/', async (req: Request, res: Response) => {
    //const { phone, email, password } = req.body
    return res.json("google 2fa")
})


// The Speakeasy package is very easy to use. Let’s take a look at generating secret tokens first.
router.post("/totp-secret", async (req: Request, res: Response) => {
    let speakeasy = Speakeasy.generateSecret({name: "NodeApp", length: 20}); // hex, ascii: "base32

    fs.writeFileSync("2fa-secret.txt", speakeasy.base32);

    let base64_string = await QRCode.toDataURL(speakeasy.otpauth_url)


    return res.json({"secret": speakeasy.base32, base64_string: base64_string});
    //return res.json({ "secret": secret.base32, base64_string: '<img src="' + base64_string + '">' });
    //return res.json("google 2fa")
});

/*
QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
    //console.log(data_url);
    //fs.writeFileSync('qrcode.jpg', data_url);
    console.log('<img src="' + data_url + '">');
});
*/


/**
 * The above example is very basic. Realistically you’d store the secret token in your database and associate it to a particular user. After it is provided to the user during generation,
 * it should never leave the backend application again. When the user needs to generate OTP tokens, they’d do something like this:
 **/
router.post("/totp-generate", (req: Request, res: Response) => {

    return res.json(
        {
            "token": Speakeasy.totp({
                secret: req.body.secret,
                encoding: "base32"
            }),
            "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
        }
    );

});


//Finally we have the validation function:
router.post("/totp-validate", (req: Request, res: Response) => {

    return res.json(
        {
            "valid": Speakeasy.totp.verify({
                secret: req.body.secret,
                encoding: "base32",
                token: req.body.token,
                window: 0
            })
        }
    );

});


export default router
