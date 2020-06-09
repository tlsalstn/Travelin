import { Request, Response } from "express";
import Axios from "axios";

class GooglePlaces {
    static getLatlng = async (req: Request, res: Response) => {
        const { key, input, inputtype, fields } = req.query;

        if(!(key && input && inputtype && fields)) {
            const result = {
                status: 400,
                message: "Please enter all the information"
            }

            res.json(result);
            return;
        }

        try {
            const response = await Axios({
                method: "GET",
                url: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
                params: {
                    key: key,
                    input: input,
                    inputtype: inputtype,
                    fields: fields
                }
            });

            if(response.data.status !== "OK") {
                const result = {
                    status: 401,
                    message: response.data.status
                }

                res.json(result);
                return;
            }

            const result = {
                status: 200,
                geometry: response.data.candidates[0].geometry
            }

            res.json(result);
        } catch (error) {
            console.log(error);
            res.json();
        }
    }
}

export default GooglePlaces;