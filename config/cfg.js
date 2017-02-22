/**
 * Created by hasee on 2017/2/8.
 */
module.exports = function () {
    global.usr = {
        cfg: {
            development: true,
            electron: {
                enable: true,
                window: {
                    frame: false,
                    width: 1024,
                    height: 600,
                    minWidth: 1024,
                    minHeight: 600
                }
            }
        }
    };
};
