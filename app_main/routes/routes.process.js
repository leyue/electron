/**
 * Created by hasee on 2017/1/20.
 */
module.exports = function () {
    global.usr.route.process = {
        SQL: {
            OPEN_DB: '/sql/openDB',
            QUERY_CMD: '/sql/query',
            GET_PROJECTS: '/sql/getProjects',
            GET_RESULTS_CNT: '/sql/getResultsCnt',
            GET_RESULTS: '/sql/getResults',
            GET_RESULT_DETAILS_CNT: '/sql/getResultDetailsCnt',
            GET_RESULT_DETAILS: '/sql/getResultDetails',
            GET_PROJECTS_FAIL_RATE: '/sql/getProjectsFailRate',
            GET_PROJECT_ERROR_ITEM: '/sql/getProjectErrorItem'
		},
        fullScan: {
            getDirScheme: '/fullScan/getDirScheme',
            getFileData: '/fullScan/getFileData',
        }
    }
};