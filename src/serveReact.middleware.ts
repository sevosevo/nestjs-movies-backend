import { NestMiddleware, Injectable } from '@nestjs/common';
import { join } from 'path';
import express = require('express');

/**
 * Used for serving REACT
 */
@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req, res, next) {
    const { url } = req;
    if (url.indexOf('/api') === 0) {
      next();
    } else {
      res.sendFile(
        join(__dirname, '../', '../', './frontend', 'dist', 'index.html'),
      );
    }
  }
}
@Injectable()
export class ServeStaticForReact implements NestMiddleware {
  use(req, res, next) {
    const { url } = req;
    if (url.indexOf('/api') === 0) {
      next();
    } else {
      express.static(join(__dirname, '../', '../', './frontend', 'dist'))(
        req,
        res,
        next,
      );
    }
  }
}
