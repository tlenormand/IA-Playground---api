'use strict';

const formatAtariModelCreatePost = (data) => {
    const user_id = data.modelConfig.userId;
    const model_name = data.modelConfig.modelName;

    // delete data.modelConfig.userId;
    // delete data.modelConfig.modelName;

    const layers = [];
    for (const layer of data.modelLayers.layers) {
        layers.push({
            layer_position: layer.layerPosition,
            input_shape: layer.inputShape,
            type: layer.type,
            filters: layer.filters,
            strides: layer.strides,
            activation: layer.activation,
            units: layer.units,
        });
    }

    return {
        user_id: user_id,
        model_name: model_name,
        model_config: {
            game: data.modelConfig.game,
            is_new_model: data.modelConfig.isNewModel,
            can_load_model: data.modelConfig.canLoadModel,
            can_save_model: data.modelConfig.canSaveModel,
            model_path: data.modelConfig.modelPath,
            model_target_name: data.modelConfig.modelTargetName,
            model_target_path: data.modelConfig.modelTargetPath,
            parameters_optimizer_type: data.modelConfig.parametersOptimizerType,
            parameters_optimizer_learningRate: data.modelConfig.parametersOptimizerLearningRate,
            parameters_optimizer_clipnorm: data.modelConfig.parametersOptimizerClipnorm,
            parameters_input_shape: data.modelConfig.parametersInputShape,
            parameters_loss_function_type: data.modelConfig.parametersLossFunctionType,
        },
        model_layers: {
            layers: layers
        },
    };
}

const formatAtariModelDeletePost = (data) => {
    return {
        user_id: data.userId,
        model_name: data.modelName,
    };
}

const formatModelDockerRunningPost = (data) => {
    return { docker_instance_ids: data.dockerInstanceIds };
}


export {
    formatAtariModelCreatePost,
    formatAtariModelDeletePost,
    formatModelDockerRunningPost,
};
