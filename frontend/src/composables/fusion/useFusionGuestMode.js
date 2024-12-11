import useCreateFusion from './useCreateFusion';

let fusions = [
    {name1: 'Air', name2: 'Fire', name: 'Smoke', icon: '/smoke.svg'},
    {name1: 'Air', name2: 'Water', name: 'Ice', icon: '/ice.svg'},
    {name1: 'Air', name2: 'Earth', name: 'Dust', icon: '/dust.svg'},
    {name1: 'Fire', name2: 'Water', name: 'Steam', icon: '/steam.svg'},
    {name1: 'Fire', name2: 'Earth', name: 'Lava', icon: '/lava.svg'},
    {name1: 'Water', name2: 'Earth', name: 'Mud', icon: '/mud.svg'},
];

/**
 * Handle the fusion between two shapes for the guest mode
 * @param shapes
 * @param addShape
 * @param emit
 * @returns {{handleFusion: ((function(*, *): Promise<void>)|*)}}
 */
export default function useFusionGuestMode(shapes, addShape, emit) {
    const handleFusion = async (shape1, shape2) => {
        shape1.ongoingFusions++;
        shape2.ongoingFusions++;

        let fusionResult = {
            icon: './favicon.svg',
            name: 'WIP',
        };

        fusionResult = fusions.find(fusion => {
            return (fusion.name1 === shape1.name && fusion.name2 === shape2.name) || (fusion.name1 === shape2.name && fusion.name2 === shape1.name);
        });

        if(!fusionResult) {
            console.error('Error while fusing:', 'No fusion found');
            shape1.ongoingFusions--;
            shape2.ongoingFusions--;
            return;
        }

        const {createFusion} = useCreateFusion(shapes, shape1, shape2, addShape, fusionResult, emit);

        createFusion(shapes, shape1, shape2, addShape, fusionResult, emit);
    };

    return {
        handleFusion,
    };
}