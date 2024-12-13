import {maskitoDateOptionsGenerator} from "@maskito/kit";
import {MaskitoOptions} from "@maskito/core";

export default maskitoDateOptionsGenerator({
    mode: 'dd/mm/yyyy',
    separator: '/'
}) satisfies MaskitoOptions