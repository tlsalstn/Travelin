import { Request, Response } from "express";
import Axios from "axios";
import token from "../config/token";

class GooglePlaces {
    static getPlace = async (req: Request, res: Response) => {
        const { input, inputtype } = req.query;

        if (!(input && inputtype)) {
            const result = {
                status: 400,
                message: "Please enter all the information"
            }

            res.json(result);
            return;
        }

        const eng = /^[a-zA-Z\s]*$/;

        try {
            const response1 = await Axios({
                method: "GET",
                url: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
                params: {
                    key: token.placesAPI,
                    input: input,
                    inputtype: inputtype
                }
            });

            if (response1.data.status !== "OK") {
                const result = {
                    status: 401,
                    type: response1.data.status,
                    message: response1.data.error_message
                }

                res.json(result);
                return;
            }

            try {
                console.log(response1.data.candidates[0].place_id);
                const response2 = await Axios({
                    method: "GET",
                    url: "https://maps.googleapis.com/maps/api/place/details/json",
                    params: {
                        key: token.placesAPI,
                        place_id: response1.data.candidates[0].place_id,
                        language: "en"
                    }
                });
                res.json(response2.data.result);
                console.log(response2.data);
                return;
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
            res.json();
        }
    }
}

export default GooglePlaces;