import AbstractAPI from '../api/AbstractApi.mjs';
import AbstractCRUD from '../crud/AbstractCRUD.mjs';
import camelCaseToSnakeCase from '../utils/camelCaseToSnakeCase.mjs';
import DockerDB from '../api/dockers/Dockers.db.mjs';
import ModelDB from '../api/models/Models.db.mjs';
import ModelConfigsDB from '../api/models/Models.configs.db.mjs';


/**
 * Represents a controller for Atari-related operations.
 */
class AtariController extends AbstractAPI {
    /**
     * Constructor.
     */
    constructor() {
        super();
        this.AbstractCRUD = new AbstractCRUD('http://localhost:5000/env');
    }

    /**
     * Creates a new Atari resource.
     *
     * @param {object} data - The data for creating the Atari resource.
     *
     * @returns {Promise<object>} A promise resolving to the response data.
     */
    async create(data) { return await this.AbstractCRUD.post('atari', camelCaseToSnakeCase(data)); }

    /**
     * Executes a step in the Atari environment.
     *
     * @param {object} data - The data for executing the step.
     *
     * @returns {Promise<object>} A promise resolving to the response data.
     */
    async step(data) { return await this.AbstractCRUD.post('atari/step', camelCaseToSnakeCase(data)); }

    /**
     * Resets the Atari environment.
     *
     * @param {object} data - The data for resetting the environment.
     *
     * @returns {Promise<object>} A promise resolving to the response data.
     */
    async reset(data) { return await this.AbstractCRUD.post('atari/reset', camelCaseToSnakeCase(data)); }

    /**
     * Destroys the Atari environment.
     *
     * @param {object} data - The data for destroying the environment.
     *
     * @returns {Promise<object>} A promise resolving to the response data.
     */
    async destroy(data) { return await this.AbstractCRUD.post('atari/destroy', camelCaseToSnakeCase(data)); }

    /**
     * Starts the training process for the Atari environment.
     *
     * @param {object} data - The data for starting the training.
     *
     * @returns {Promise<object>} A promise resolving to the response data.
     */
    async startTrainning(data) { return await this.AbstractCRUD.post('atari/train/start', camelCaseToSnakeCase(data)); }

    /**
     * Stops the training process for the Atari environment.
     *
     * @param {object} data - The data for stopping the training.
     * @param {string} data.userId - The ID of the user.
     * @param {string} data.modelName - The name of the model.
     *
     * @returns {Promise<object>} A promise resolving to the response data.
     */
    async stopTrainning(data) {
        const query = { userId: data.userId, modelName: data.modelName };

        const modelConfig = await new ModelConfigsDB().findOne(query);
        if (!modelConfig) return new Error(404_005);

        const model = await new ModelDB().findOne({ modelConfigId: modelConfig._id });
        if (!model) return new Error(404_004);

        const dockerInstances = await new DockerDB().find({ _id: { $in: model.dockerInstanceIds } });
        if (!dockerInstances) return new Error(404_006);

        const formattedData = {
            ...data,
            dockerInstanceIds: dockerInstances.map(dockerInstance => dockerInstance.id)
        };

        return await this.AbstractCRUD.post('atari/train/stop', camelCaseToSnakeCase(formattedData));
    }
}


export default AtariController;
