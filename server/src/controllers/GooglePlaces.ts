import { Request, Response } from "express";
import Axios from "axios";
import token from "../config/token";

class GooglePlaces {
    static getLatlng = async (req: Request, res: Response) => {
        const { input, inputtype, fields } = req.query;

        if(!(input && inputtype && fields)) {
            const result = {
                status: 400,
                message: "Please enter all the information"
            }

            res.json(result);
            return;
        }

        const eng = /^[a-zA-Z\s]*$/;

        try {
            const response = await Axios({
                method: "GET",
                url: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
                params: {
                    key: token.placesAPI,
                    input: input,
                    inputtype: inputtype,
                    fields: fields,
                    language: eng.test(input.toString()) ? "en" : "ko"
                }
            });

            if(response.data.status !== "OK") {
                const result = {
                    status: 401,
                    type: response.data.status,
                    message: response.data.error_message
                }

                res.json(result);
                return;
            }

            const result = response.data

            res.json(result);
        } catch (error) {
            console.log(error);
            res.json();
        }
    }
}

export default GooglePlaces;