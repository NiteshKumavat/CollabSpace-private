import Request from '../models/request.model.js';


//Todo : Get all requests for a user
export const getAllRequests = async ( req, res ) => {
    try {
        const userId = req.user._id;
        const requests = await Request.find({ To: userId });
        if(!requests){
            return res.status(404).json({message : "No requests found"});
        }
        return res.status(200).json({requests : requests});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
};

//Todo : Create a request

export const createRequest = async ( req, res ) => {
    try {
        const { To, projectId, message } = req.body;
        const From = req.user._id;

        if(!To || !projectId){
            return res.status(400).json({message : "To and ProjectId are required"});
        }

        const newRequest = new Request({
            From,
            To,
            projectId,
            message,
        });

        if(!newRequest){
            return res.status(400).json({message : "Request creation failed"});
        }

        const savedRequest =  await newRequest.save();
        return res.status(201).json({request : savedRequest});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}
//Todo : Update a request (Status Update)

export const updateRequest = async ( req, res ) => {
    try {
        const updates = req.body;
        const requestId = req.body.requestId;

        const updatedRequest = await Request.findByIdAndUpdate(
            requestId, updates, {new : true}
        );
        if (!updatedRequest){
            return res.status(400).json({message : "Request update failed"});
        }
        return res.status(200).json({request : updatedRequest});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}
//Todo : Delete a request
export const deleteRequest = async ( req, res ) => {
    try {
        const requestId = req.body.requestId;

        const deletedRequest = await Request.findByIdAndDelete(requestId);
        if(!deletedRequest){
            return res.status(400).json({message : "Request deletion failed"});
        }

        return res.status(200).json({message : "Request deleted successfully"});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
};