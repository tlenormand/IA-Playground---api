import TestSequencer from '@jest/test-sequencer';


const priority = [
    'info.test.mjs',
    'register.test.mjs',
    'login.test.mjs',
    // 'logout.test.mjs',
];

class CustomSequencer extends TestSequencer.default {
    /**
     * Sorts the tests based on priority defined in the priority array.
     * If a test is not defined in the priority array, it will be sorted after the tests with priority.
     * 
     * @param {Array} tests - An array of tests to be sorted.
     * 
     * @returns {Array} - The sorted array of tests.
     */
    sort(tests) {
        const copy = tests.slice(0);

        copy.sort((a, b) => {
            const aIndex = priority.indexOf(this.extractFileName(a.path));
            const bIndex = priority.indexOf(this.extractFileName(b.path));

            if (aIndex === -1 && bIndex === -1) {
                // case where both are not in the priority array
            } else if (aIndex === -1) {
                // case where a is not in the priority array
                return 1;
            } else if (bIndex === -1) {
                // case where b is not in the priority array
                return -1;
            } else {
                // case where both are in the priority array
                return aIndex - bIndex;
            }
        });

        return copy;
    }

    /**
     * Extracts the file name from the file path.
     * 
     * @param {string} path - The file path.
     * 
     * @returns {string} - The file name.
     */
    extractFileName(path) {
        return path.split('/').pop();
    }
}


export default CustomSequencer;
