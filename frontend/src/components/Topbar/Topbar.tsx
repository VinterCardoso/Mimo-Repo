import { Box } from "@mui/material"
import { TopbarCoupon } from "./TopbarCoupon"
import mimoLogo from "../../assets/mimoLogo.png"
import { Search } from "../Search/Search"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import colors from "../../colors";
import { TopbarSections } from "./TopbarSections";

function Topbar() {

    return (
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
            <TopbarCoupon />
            <Box sx={{display: 'flex', gap: '45px', alignItems: 'center'}}>
                <Box sx={{width: '320px'}}>
                    <img src={mimoLogo} alt="Mimo" width={300} />
                </Box>
                <Box>
                    <Search />
                </Box>
                <Box sx={{display: 'flex', width: '170px', justifyContent: 'space-between', alignItems: 'center'}}>
                    <ShoppingCartOutlinedIcon sx={{width: '24px', height: '24px', color: colors.primary}}/>
                    <FavoriteBorderOutlinedIcon sx={{width: '24px', height: '24px', color: colors.primary}}/>
                    <SentimentSatisfiedAltOutlinedIcon sx={{width: '24px', height: '24px', color: colors.primary}}/>
                </Box>
            </Box>
                <Box>
                    <TopbarSections />
                </Box>
        </Box>
    )
}

export { Topbar }